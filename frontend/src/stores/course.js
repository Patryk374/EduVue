import { defineStore } from 'pinia'
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from 'firebase/firestore'
import { db } from '../firebase'

const mockCourses = [
  {
    id: 1,
    title: 'Wprowadzenie do programowania',
    description: 'Podstawy programowania dla początkujących',
    category: 'programming',
    duration: '10 godzin',
    level: 'beginner',
    rating: 4.5,
    image: 'https://picsum.photos/200',
    lessons: [
      {
        id: 1,
        title: 'Wprowadzenie do programowania',
        duration: '30 min',
        durationMinutes: 30,
        order: 1,
        completed: false
      },
      {
        id: 2,
        title: 'Podstawowe typy danych',
        duration: '45 min',
        durationMinutes: 45,
        order: 2,
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: 'Zaawansowane programowanie',
    description: 'Zaawansowane koncepcje programistyczne',
    category: 'programming',
    duration: '15 godzin',
    level: 'advanced',
    rating: 4.8,
    image: 'https://picsum.photos/201',
    lessons: [
      {
        id: 1,
        title: 'Wzorce projektowe',
        duration: '60 min',
        durationMinutes: 60,
        order: 1,
        completed: false
      },
      {
        id: 2,
        title: 'Testy jednostkowe',
        duration: '45 min',
        durationMinutes: 45,
        order: 2,
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: 'Podstawy matematyki',
    description: 'Podstawowe koncepcje matematyczne',
    category: 'mathematics',
    duration: '8 godzin',
    level: 'beginner',
    rating: 4.2,
    image: 'https://picsum.photos/202',
    lessons: [
      {
        id: 1,
        title: 'Algebra liniowa',
        duration: '40 min',
        durationMinutes: 40,
        order: 1,
        completed: false
      },
      {
        id: 2,
        title: 'Rachunek różniczkowy',
        duration: '50 min',
        durationMinutes: 50,
        order: 2,
        completed: false
      }
    ]
  }
]

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    currentCourse: null,
    loading: false,
    error: null
  }),

  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    },
    getPopularCourses: (state) => {
      return state.courses.sort((a, b) => b.rating - a.rating).slice(0, 4)
    }
  },

  actions: {
    async fetchCourses() {
      this.loading = true
      this.error = null
      try {
        const coursesCollection = collection(db, 'courses')
        const querySnapshot = await getDocs(coursesCollection)
        this.courses = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        this.error = error.message
        console.error('Error fetching courses:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCourseById(id) {
      this.loading = true
      this.error = null
      try {
        const courseDoc = doc(db, 'courses', id)
        const courseSnapshot = await getDoc(courseDoc)
        
        if (!courseSnapshot.exists()) {
          throw new Error('Course not found')
        }
        
        this.currentCourse = {
          id: courseSnapshot.id,
          ...courseSnapshot.data()
        }
      } catch (error) {
        this.error = error.message
        console.error('Error fetching course:', error)
        this.currentCourse = null
      } finally {
        this.loading = false
      }
    },

    async createCourse(courseData) {
      this.loading = true
      this.error = null
      try {
        const coursesCollection = collection(db, 'courses')
        const docRef = await addDoc(coursesCollection, courseData)
        const newCourse = {
          id: docRef.id,
          ...courseData
        }
        this.courses.push(newCourse)
        return newCourse
      } catch (error) {
        this.error = error.message
        console.error('Error creating course:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCourse(id, courseData) {
      this.loading = true
      this.error = null
      try {
        const courseRef = doc(db, 'courses', id)
        await updateDoc(courseRef, courseData)
        
        const index = this.courses.findIndex(course => course.id === id)
        if (index !== -1) {
          this.courses[index] = {
            ...this.courses[index],
            ...courseData
          }
        }
      } catch (error) {
        this.error = error.message
        console.error('Error updating course:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCourse(id) {
      this.loading = true
      this.error = null
      try {
        const courseRef = doc(db, 'courses', id)
        await deleteDoc(courseRef)
        this.courses = this.courses.filter(course => course.id !== id)
      } catch (error) {
        this.error = error.message
        console.error('Error deleting course:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 