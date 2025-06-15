import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

const initialCourses = [
  {
    title: 'Wprowadzenie do programowania',
    description: 'Podstawy programowania dla początkujących',
    title_en: 'Introduction to Programming',
    description_en: 'Basics of programming for beginners',
    category: 'programming',
    duration: 120,
    level: 'beginner',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    lessons: [
      {
        title: 'Wprowadzenie do programowania',
        title_en: 'Introduction to Programming',
        duration: 30,
        completed: false
      },
      {
        title: 'Podstawowe koncepcje',
        title_en: 'Basic Concepts',
        duration: 45,
        completed: false
      },
      {
        title: 'Pierwszy program',
        title_en: 'First Program',
        duration: 45,
        completed: false
      }
    ]
  },
  {
    title: 'Zaawansowany JavaScript',
    description: 'Poznaj zaawansowane koncepcje JavaScript',
    title_en: 'Advanced JavaScript',
    description_en: 'Learn advanced JavaScript concepts',
    category: 'programming',
    duration: 180,
    level: 'advanced',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    lessons: [
      {
        title: 'Wprowadzenie do JavaScript',
        title_en: 'Introduction to JavaScript',
        duration: 45,
        completed: false
      },
      {
        title: 'Zaawansowane koncepcje',
        title_en: 'Advanced Concepts',
        duration: 60,
        completed: false
      },
      {
        title: 'Praktyczne zastosowania',
        title_en: 'Practical Applications',
        duration: 75,
        completed: false
      }
    ]
  },
  {
    title: 'Podstawy HTML i CSS',
    description: 'Naucz się tworzyć piękne strony internetowe',
    title_en: 'HTML and CSS Basics',
    description_en: 'Learn to create beautiful websites',
    category: 'web',
    duration: 90,
    level: 'beginner',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
    lessons: [
      {
        title: 'Wprowadzenie do HTML',
        title_en: 'Introduction to HTML',
        duration: 30,
        completed: false
      },
      {
        title: 'Podstawy CSS',
        title_en: 'CSS Basics',
        duration: 30,
        completed: false
      },
      {
        title: 'Responsywny design',
        title_en: 'Responsive Design',
        duration: 30,
        completed: false
      }
    ]
  }
]

export async function initializeFirebase() {
  try {
    // Usuń istniejące kursy
    const coursesSnapshot = await getDocs(collection(db, 'courses'))
    const deletePromises = coursesSnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
    console.log('Usunięto istniejące kursy z Firebase')

    // Dodaj przykładowe kursy
    for (const course of initialCourses) {
      await addDoc(collection(db, 'courses'), course)
    }
    console.log('Dodano przykładowe kursy do Firebase')
  } catch (error) {
    console.error('Błąd podczas inicjalizacji Firebase:', error)
  }
} 