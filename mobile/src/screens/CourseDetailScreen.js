import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { Card, Text } from 'react-native-paper';
import i18n from '../i18n';
import { useLanguage } from '../LanguageContext';

export default function CourseDetailScreen({ route, navigation }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const course = route?.params?.course;

  useEffect(() => {
    if (!course) return;
    const title = i18n.locale === 'en' ? course.title_en : course.title;
    navigation.setOptions({ title });
  }, [navigation, language, course?.title, course?.title_en]);

  if (!course) {
    return null;
  }
  return (
    <Card style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Card.Content>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}> 
          {i18n.locale === 'en' ? course.title_en : course.title}
        </Text>
        <Text style={{ marginBottom: 8, color: theme.colors.onBackground }}>
          {i18n.locale === 'en' ? course.description_en : course.description}
        </Text>
        <Text style={{ color: theme.colors.onBackground }}>{course.duration}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 }
});