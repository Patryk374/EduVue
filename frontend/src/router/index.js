import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import CourseDetail from '../views/CourseDetail.vue'
import CanvasTest from "../canvas/CanvasDashboard.vue";

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
      title: 'Courses'
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
  //   musi byc ostatni bo inaczej zbiera wszystkie nieznane sciezki
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = `${to.meta.title} - EduVue`
  next()
})

export default router 