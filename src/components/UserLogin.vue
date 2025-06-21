<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200"
  >
    <div class="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Welcome to TaskFlow</h2>

      <form @submit.prevent="login" class="space-y-4">
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
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-center text-gray-500 mt-4">
        Don't have an account?
        <router-link to="/register" class="text-indigo-600 font-medium">Register</router-link>
      </p>

      <div class="flex items-center my-4">
        <div class="flex-grow h-px bg-gray-300"></div>
        <span class="px-2 text-gray-400 text-sm">OR</span>
        <div class="flex-grow h-px bg-gray-300"></div>
      </div>

      <button
        @click="loginWithGoogle"
        class="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 py-2 rounded-lg hover:shadow transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <span class="text-gray-800 font-medium">Sign in with Google</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    alert('Logged in successfully')
    router.push('/dashboard')
  } catch (err) {
    alert(err.message)
  }
}

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    alert('Logged in with Google!')
    router.push('/dashboard')
  } catch (err) {
    alert(err.message)
  }
}
</script>
