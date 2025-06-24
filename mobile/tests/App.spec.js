import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer, { act as rendererAct } from 'react-test-renderer';
import App from '../App';
import i18n from '../src/i18n';
 
// Test 1: Renderowanie głównego komponentu App
it('renders NavigationContainer with stack screens and i18n titles', () => {
  let tree;
  rendererAct(() => {
    tree = renderer.create(<App />);
  });
  const screens = tree.root.findAll(node => node.props && node.props.name);
  const names = screens.map(s => s.props.name);
  const uniqueNames = [...new Set(names)];
  expect(uniqueNames).toEqual(['Home', 'Courses', 'CourseDetail']);
  const homeScreen = screens.find(s => s.props.name === 'Home');
  const coursesScreen = screens.find(s => s.props.name === 'Courses');
  expect(homeScreen.props.options.title).toBe(i18n.t('nav.home'));
  expect(coursesScreen.props.options.title).toBe(i18n.t('nav.courses'));
});
 
// Test 9: Komponent nawigacji – routing działa poprawnie
it('navigates to Courses screen from Home', async () => {

  const { getByText, findByPlaceholderText } = render(<App />);
  fireEvent.press(getByText(i18n.t('home.startLearning')));
  const search = await findByPlaceholderText(i18n.t('courses.search'));
  expect(search).toBeTruthy();
});
 
// Test 10: Test snapshotowy App
it('matches App snapshot', () => {
  let tree;
  rendererAct(() => {
    tree = renderer.create(<App />);
  });
  const json = tree.toJSON();
  expect(json).toMatchSnapshot();
});
