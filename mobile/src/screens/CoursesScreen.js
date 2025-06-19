import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { TextInput, IconButton } from 'react-native-paper';
import CourseCard from '../components/CourseCard';
import OptionsMenu from '../components/OptionsMenu';
import coursesData from '../mockCourses';
import i18n from '../i18n';
import { useLanguage } from '../LanguageContext';

export default function CoursesScreen({ navigation }) {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('nav.courses'),
      headerLeft: () => <OptionsMenu />,
      headerRight: () => (
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.navigate('Home')}
          accessibilityLabel={i18n.t('courses.returnToHome')}
        />
      ),
    });
  }, [navigation, language]);

  const filtered = coursesData.filter(c => {
    const localizedTitle = i18n.locale === 'en' ? c.title_en : c.title;
    return localizedTitle.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput
        mode="outlined"
        style={styles.input}
        placeholder={i18n.t('courses.search')}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => navigation.navigate('CourseDetail', { course: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 8, marginBottom: 12, borderRadius: 4 },
});