import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { Button, Text } from 'react-native-paper';
import i18n from '../i18n';
import { useLanguage } from '../LanguageContext';
import OptionsMenu from '../components/OptionsMenu';

export default function HomeScreen({ navigation }) {
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: i18n.t('nav.home'),
      headerLeft: () => <OptionsMenu />,
    });
  }, [navigation, language]);
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>
        {i18n.t('home.title')}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
        {i18n.t('home.subtitle')}
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate('Courses')}>
        {i18n.t('home.startLearning')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 24, textAlign: 'center' }
});