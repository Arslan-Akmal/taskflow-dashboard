<template>
  <div class="min-h-screen p-4 sm:p-6 bg-gray-100">
    <div class="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 class="text-xl sm:text-2xl font-bold text-indigo-700">Task Dashboard</h2>
        <p class="text-sm text-gray-600 text-center sm:text-left">
          Logged in as: <span class="font-medium text-indigo-700">{{ userRole }}</span>
        </p>
        <button
          @click="logout"
          class="hidden sm:block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <!-- Add Task Form -->
      <form @submit.prevent="addTask" class="space-y-4 mb-6">
        <input
          v-model="title"
          placeholder="Task Title"
          class="w-full px-4 py-2 border rounded text-black"
          required
        />
        <textarea
          v-model="description"
          placeholder="Task Description"
          class="w-full px-4 py-2 border rounded text-black"
          required
        />
        <select v-model="status" class="w-full px-4 py-2 border rounded text-black" required>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <!-- Assign to user dropdown for admin -->
        <select
          v-if="userRole === 'admin'"
          v-model="assignedTo"
          class="w-full px-4 py-2 border rounded text-black"
          required
        >
          <option value="" disabled>Select user to assign</option>
          <option v-for="user in users" :key="user.uid" :value="user.uid">
            {{ user.email }}
          </option>
        </select>

        <button class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Add Task
        </button>
      </form>

      <!-- Task List -->
      <div v-if="tasks.length" class="space-y-4">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="border p-4 rounded shadow bg-white text-black"
        >
          <h3 class="font-semibold text-lg">{{ task.title }}</h3>
          <p class="text-gray-600">{{ task.description }}</p>
          <p class="text-sm text-gray-400">Status: {{ task.status }}</p>
          <p class="text-xs text-gray-400">Assigned To: {{ task.assignedTo }}</p>
          <div class="mt-2 flex gap-4">
            <button @click="openEditModal(task)" class="text-blue-600 hover:underline text-sm">
              Edit
            </button>
            <button @click="deleteTask(task.id)" class="text-red-600 hover:underline text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center">No tasks found.</div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow max-w-md w-full">
        <h3 class="text-lg font-bold text-indigo-700 mb-4">Edit Task</h3>
        <input
          v-model="editTaskData.title"
          class="w-full mb-2 px-4 py-2 border rounded text-black"
          placeholder="Title"
        />
        <textarea
          v-model="editTaskData.description"
          class="w-full mb-2 px-4 py-2 border rounded text-black"
          placeholder="Description"
        ></textarea>
        <select
          v-model="editTaskData.status"
          class="w-full mb-4 px-4 py-2 border rounded text-black"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div class="flex flex-col sm:flex-row justify-end gap-2">
          <button
            @click="showEditModal = false"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="updateTask"
            class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile-only logout button -->
    <div class="sm:hidden relative top-2">
      <button
        @click="logout"
        class="w-full bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '../firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const router = useRouter()

const title = ref('')
const description = ref('')
const status = ref('pending')
const assignedTo = ref('')
const tasks = ref([])
const users = ref([])
const userId = ref('')
const userRole = ref('member')

const tasksCollection = collection(db, 'tasks')

// Get user info and tasks
onMounted(async () => {
  const user = auth.currentUser
  if (user) {
    userId.value = user.uid

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      userRole.value = userDoc.data().role

      if (userRole.value === 'admin') {
        const userSnap = await getDocs(collection(db, 'users'))
        users.value = userSnap.docs.map((doc) => ({
          uid: doc.id,
          email: doc.data().email,
        }))
      }
    }

    onSnapshot(tasksCollection, (snapshot) => {
      const allTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      tasks.value =
        userRole.value === 'admin'
          ? allTasks
          : allTasks.filter((task) => task.assignedTo === userId.value)
    })
  }
})

// Add task
const addTask = async () => {
  if (!title.value || !description.value) return
  await addDoc(tasksCollection, {
    title: title.value,
    description: description.value,
    status: status.value,
    assignedTo: userRole.value === 'admin' ? assignedTo.value : userId.value,
    createdAt: serverTimestamp(),
  })
  title.value = ''
  description.value = ''
  status.value = 'pending'
  assignedTo.value = ''
}

// Delete task
const deleteTask = async (id) => {
  await deleteDoc(doc(db, 'tasks', id))
}

// Logout
const logout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    alert('Error logging out: ' + error.message)
  }
}

// Edit modal logic
const showEditModal = ref(false)
const editTaskData = ref({ id: '', title: '', description: '', status: '' })

const openEditModal = (task) => {
  editTaskData.value = { ...task }
  showEditModal.value = true
}

const updateTask = async () => {
  const docRef = doc(db, 'tasks', editTaskData.value.id)
  await updateDoc(docRef, {
    title: editTaskData.value.title,
    description: editTaskData.value.description,
    status: editTaskData.value.status,
  })
  showEditModal.value = false
}
</script>
