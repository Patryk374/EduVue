using EduVue.Api;
using Xunit;

namespace EduVue.Api.Tests
{
    // Test verifies that the Course record stores values passed to the constructor
    public class CourseTests
    {
        [Fact]
        public void Constructor_SetsProperties()
        {
            var course = new Course(1, "Test", "1 week", "10-12", "desc");
            Assert.Equal(1, course.Id);
            Assert.Equal("Test", course.Nazwa);
            Assert.Equal("1 week", course.Dlugosc_trwania);
            Assert.Equal("10-12", course.Sugerowany_przedzial_wiekowy);
            Assert.Equal("desc", course.Szczegoly);
        }
    }
}
