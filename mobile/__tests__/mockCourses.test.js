const courses = require('../src/mockCourses.js').default || require('../src/mockCourses.js');

test('contains three example courses', () => {
  expect(courses).toHaveLength(3);
});
