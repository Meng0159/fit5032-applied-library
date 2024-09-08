import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../components/AccessDeniedPage.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'

function isAuthenticated() {
  const currentUser = JSON.parse(localStorage.getItem('userState') === 'true' || false)
  return currentUser
}

// Navigation guard to protect routes that require authentication
function userAuthenticated(to, from, next) {
  if (isAuthenticated()) {
    next() // allow to enter route
    console.log(isAuthenticated())
  } else {
    alert('Please log in to access.')
    next('/AccessDenied') // redirect to login if not authenticated
    console.log(isAuthenticated())
  }
}

const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: userAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/AccessDenied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
