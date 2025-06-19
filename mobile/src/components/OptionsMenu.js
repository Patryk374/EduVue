import React from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import i18n from '../i18n';

export default function OptionsMenu() {
  const { toggleTheme, isDark } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleTheme = () => {
    toggleTheme();
    closeMenu();
  };

  const handleLanguage = () => {
    changeLanguage(language.startsWith('en') ? 'pl' : 'en');
    closeMenu();
  };

  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}>
      <Menu.Item onPress={handleTheme} title={isDark ? i18n.t('menu.light') : i18n.t('menu.dark')} />
      <Menu.Item onPress={handleLanguage} title={i18n.t('menu.language')} />
    </Menu>
  );
}
