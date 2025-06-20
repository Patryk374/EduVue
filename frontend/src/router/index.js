import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import CourseDetail from '../views/CourseDetail.vue'
import CanvasTest from "../canvas/CanvasDashboard.vue";
import Login from "../views/Login.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      title: 'Courses',
      requiresAuth: true
    }
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: CourseDetail,
    props: true,
    meta: {
      title: 'Course Details'
    }
  },
  {
    path: '/canvas',
    name: 'CanvasTest',
    component: CanvasTest,
    meta: { title: 'Canvas Test' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' }
  },
  //   musi byc ostatni bo inaczej zbiera wszystkie nieznane sciezki
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = `${to.meta.title} - EduVue`
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();
    if (requiresAuth && !user) {
      next('/login');
    } else {
      next();
    }
  });
})

export default router 