import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LandingPage from '../views/LandingPage.vue'
import SpaceWorkspace from '../views/SpaceWorkspace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
    },
    {
      path: '/:spaceName',
      name: 'workspace',
      component: SpaceWorkspace,
    },
  ],
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userSpace = Cookies.get('user_space_name')

  if (to.name === 'workspace') {
    // If attempting to access a workspace
    if (!userSpace) {
      // No space cookie found, redirect to landing gate
      return next({ name: 'landing' })
    } else if (userSpace !== to.params.spaceName) {
      // Cookie exists but doesn't match current spaceName parameter, redirect to user's cookie space
      return next({ name: 'workspace', params: { spaceName: userSpace } })
    }
  } else if (to.name === 'landing') {
    // If accessing landing page, but user already has a valid space cookie
    if (userSpace) {
      return next({ name: 'workspace', params: { spaceName: userSpace } })
    }
  }

  next()
})

export default router
