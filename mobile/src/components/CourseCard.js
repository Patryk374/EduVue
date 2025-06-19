import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';
import i18n from '../i18n';

const levelIcons = {
  beginner: 'school',
  advanced: 'rocket-launch',
};

export default function CourseCard({ course, onPress }) {
  const { isDark } = useTheme();
  const icon = levelIcons[course.level] || 'school';
  return (
    <Card style={[styles.card, { backgroundColor: isDark ? '#1F2937' : '#fff' }]}
          onPress={onPress}>
      <Card.Cover source={require('../../assets/icon.png')} style={styles.cover} />
      <Card.Title
        title={i18n.locale === 'en' ? course.title_en : course.title}
        left={(props) => <IconButton {...props} icon={icon} />}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={{ color: isDark ? '#ccc' : '#555' }}>
          {i18n.locale === 'en' ? course.description_en : course.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={onPress}>
          {i18n.t('courses.enroll')}
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  cover: {
    height: 120,
  },
});
