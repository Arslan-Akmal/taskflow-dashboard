import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import UserDashborad from '@/components/UserDashborad.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin,
    },
    {
      path: '/register',
      name: 'register',
      component: UserRegister,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDashborad,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// ✅ Add global navigation guard
router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !user) {
    next('/login') // 🔒 redirect if not logged in
  } else {
    next() // ✅ proceed
  }
})

export default router
