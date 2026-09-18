import { createRouter, createWebHistory } from 'vue-router'
import WordBooks from '../views/WordBooks.vue'
import Words from '../views/Words.vue'
import Users from '../views/Users.vue'

const routes = [
  {
    path: '/',
    redirect: '/word-books'
  },
  {
    path: '/word-books',
    name: 'WordBooks',
    component: WordBooks
  },
  {
    path: '/words',
    name: 'Words',
    component: Words
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
