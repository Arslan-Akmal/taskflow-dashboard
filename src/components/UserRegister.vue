<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200"
  >
    <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>

      <form @submit.prevent="register" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-400 text-black placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-400 text-black placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />
        <select
          v-model="role"
          class="w-full px-4 py-2 border border-gray-400 text-black placeholder-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 mb-4"
          required
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>

      <p class="text-sm text-center text-gray-500 mt-4">
        Already have an account?
        <router-link to="/login" class="text-indigo-600 font-medium">Login</router-link>
      </p>

      <div class="flex items-center my-4">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-2 text-gray-400 text-sm">OR</span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>

      <button
        @click="registerWithGoogle"
        class="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 py-2 rounded-lg hover:shadow transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <span class="text-gray-800 font-medium">Sign up with Google</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const email = ref('')
const password = ref('')
const role = ref('member')

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Save role and email to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role.value,
    })

    alert('Account created successfully!')
  } catch (err) {
    alert(err.message)
  }
}

const registerWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Save to Firestore (if not already there)
    await setDoc(
      doc(db, 'users', user.uid),
      {
        email: user.email,
        role: user.role,
      },
      { merge: true },
    )

    alert('Registered with Google!')
  } catch (err) {
    alert(err.message)
  }
}
</script>
