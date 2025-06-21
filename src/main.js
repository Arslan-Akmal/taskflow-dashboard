import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import './assets/main.css'

// Prevent Vue from mounting until Firebase Auth is ready
let app = null

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(router)
    app.mount('#app')
  }
})
