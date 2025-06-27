import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      news: 'News'
    },
    home: {
      title: 'Learn Programming with EduVue',
      subtitle: 'Master programming through interactive courses and hands-on projects',
      description: 'Start your learning journey today with our comprehensive courses',
      popularCourses: 'Popular Courses',
      startLearning: 'Start Learning',
      whyChoose: 'Why Choose EduVue?',
      features: {
        interactive: {
          title: 'Interactive Learning',
          description: 'Learn by doing with hands-on projects and real-world examples'
        },
        experts: {
          title: 'Expert Instructors',
          description: 'Learn from industry professionals with years of experience'
        },
        flexible: {
          title: 'Flexible Schedule',
          description: 'Learn at your own pace with 24/7 access to course materials'
        }
      }
    },
    courses: {
      title: 'Available Courses',
      subtitle: 'Find the perfect course to start your programming journey',
      search: 'Search courses...',
      filter: 'Filter by category',
      noCourses: 'No courses found',
      backToCourses: 'Back to Courses',
      returnToHome: 'Return to Home',
      clearFilters: 'Clear filters',
      categories: {
        programming: 'Programming',
        web: 'Web Development'
      },
      levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      }
    },
    course: {
      start: 'Start Course',
      review: 'Review',
      progress: 'Progress',
      lessons: 'Lessons',
      duration: 'Duration',
      level: 'Level',
      completedLessons: 'Completed Lessons',
      remainingTime: 'Remaining Time',
      details: 'Course Details'
    },
    footer: {
      rights: 'All rights reserved'
    },
    news: {
      title: 'News from the programming world',
      subtitle: 'Discover the latest articles and trends via Hacker News',
      loading: 'Loading news...'
    }
  },
  pl: {
    nav: {
      home: 'Strona główna',
      courses: 'Kursy',
      news: 'Nowinki'
      
    },
    home: {
      title: 'Ucz się programowania z EduVue',
      subtitle: 'Opanuj programowanie dzięki interaktywnym kursom i praktycznym projektom',
      description: 'Rozpocznij swoją przygodę z nauką już dziś z naszymi kompleksowymi kursami',
      popularCourses: 'Popularne kursy',
      startLearning: 'Rozpocznij naukę',
      whyChoose: 'Dlaczego EduVue?',
      features: {
        interactive: {
          title: 'Interaktywna Nauka',
          description: 'Ucz się poprzez praktykę z projektami i przykładami z życia wziętymi'
        },
        experts: {
          title: 'Eksperci',
          description: 'Ucz się od profesjonalistów z wieloletnim doświadczeniem'
        },
        flexible: {
          title: 'Elastyczny Harmonogram',
          description: 'Ucz się we własnym tempie z dostępem do materiałów 24/7'
        }
      }
    },
    courses: {
      title: 'Dostępne kursy',
      subtitle: 'Znajdź idealny kurs, aby rozpocząć swoją przygodę z programowaniem',
      search: 'Szukaj kursów...',
      filter: 'Filtruj według kategorii',
      noCourses: 'Nie znaleziono kursów',
      backToCourses: 'Powrót do kursów',
      returnToHome: 'Powrót do strony głównej',
      clearFilters: 'Wyczyść filtry',
      categories: {
        programming: 'Programowanie',
        web: 'Tworzenie stron WWW'
      },
      levels: {
        beginner: 'Początkujący',
        intermediate: 'Średniozaawansowany',
        advanced: 'Zaawansowany'
      }
    },
    course: {
      start: 'Rozpocznij kurs',
      review: 'Powtórz',
      progress: 'Postęp',
      lessons: 'Lekcje',
      duration: 'Czas trwania',
      level: 'Poziom',
      completedLessons: 'Ukończone lekcje',
      remainingTime: 'Pozostały czas',
      details: 'Szczegóły kursu'
    },
    footer: {
      rights: 'Wszelkie prawa zastrzeżone'
    },
    news: {
      title: 'Nowinki ze świata programowania',
      subtitle: 'Poznaj najnowsze artykuły i trendy dzięki Hacker News',
      loading: 'Ładowanie nowinek...'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'pl',
  fallbackLocale: 'en',
  messages
})

export default i18n 