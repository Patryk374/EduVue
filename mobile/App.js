import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import { ThemeProvider } from './src/ThemeContext';
import { LanguageProvider } from './src/LanguageContext';
import i18n from './src/i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: i18n.t('nav.home') }} />
            <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: i18n.t('nav.courses') }} />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}