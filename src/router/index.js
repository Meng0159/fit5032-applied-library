import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../components/AccessDeniedPage.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBooksAPI from '@/views/GetAllBooksAPI.vue'

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
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/getBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/get-all-books',
    name: 'GetAllBooksAPI',
    component: GetAllBooksAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
