// install express with `npm install express` 
const express = require('express')
const { Deta } = require('deta')
const { Lecture, Course } = require('Models')
require('dotenv').config()

const app = express()
const deta = Deta(process.env.PROJECT_ID)
const lectureDb = deta.Base('Lectures')
const courseDb = deta.Base('Courses')
const drive = deta.Drive("recordings")

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static('./public'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 5500

async function fetchCourses() {
    const courses = courseDb.fetch();
    return courses;
}

async function fetchLectures() {
    const lectures  = lectureDb.fetch();
    return lectures;
}

async function createNewCourse(req, res) {
    const { lecturerName, courseTitle, courseCode, courseTime, courseDay, courseWeek } = req.body;

    const course = new Course(
      lecturerName,
      courseTitle,
      courseCode,
      courseTime,
      courseDay,
      courseWeek
    );

    await courseDb.put({ ...course.get() }, course.key);

    res.render('admin', { lectures: await fetchLectures() })
}

async function createNewLecture(req, res) {
    const { courseId, startTime, endTime, attendance } = req.body;
    const { name, data } = req.files.recording;
    const mediaURL = `lecture-${Date.now()}.${name.split('.').at(-1)}`;

    await drive.put(mediaURL, { data: data });

    const lecture = new Lecture(courseId, startTime, endTime, attendance, mediaURL);

    await lectureDb.put(lecture.get());
    
    res.render("index", { courses: await fetchCourses() });
}

app.get('/', async (req, res) => res.render('index', { courses: await fetchCourses() }))
app.get('/admin', async (req, res) => res.render('admin', { lectures: await fetchLectures() }))

app.post('/new-course', (req, res) => {
    createNewCourse(req, res);
})

app.post('/new-lecture', (req, res) => {
    createNewLecture(req, res);
})

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`)})

// export 'app'
module.exports = app