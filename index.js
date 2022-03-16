// install express with `npm install express`
const express = require('express')
const { upload } = require('./multer')
const { fetchLectures, fetchCourses, fetchCourse, saveLecture } = require('./logic')
require('dotenv').config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', './views')

const PORT = process.env.PORT || 5500

app.get('/', (_, res) => {
  res.redirect('/1');
})

app.get('/1', async (_, res) => {
  const courses = (await fetchCourses()).filter(course => course.semester === 'First Semester');
  res.render('index', { courses, semester: 1 });
})

app.get('/2', async (_, res) => {
  const courses = (await fetchCourses()).filter(course => course.semester === 'Second Semester');
  res.render('index', { courses, semester: 2 })
})

app.get('/record/:id', async (req, res) => {
  const course = await fetchCourse(req.params.id);
  res.render('record', { ...course });
})

app.get('/admin', (_, res) => {
  res.redirect('/admin/1');
})

app.get('/admin/1', async (_, res) => {
  const courses = (await fetchCourses()).filter(course => course.semester === 'First Semester');
  res.render('admin', { courses, semester: 1 });
})

app.get('/admin/2', async (_, res) => {
  const courses = (await fetchCourses()).filter(course => course.semester === 'Second Semester');
  res.render('admin', { courses, semester: 2 });
})

app.get('/view/:id', async (req, res) => {
  const course = await fetchCourse(req.params.id.trim());
  const lectures = await fetchLectures(req.params.id);

  res.render('view', { ...course, lectures: JSON.stringify(lectures) })
})

app.post('/update-recording/:id', upload.single('recording'), (req, res) => {
  saveLecture(req, res);
})

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`)})

// export 'app'
module.exports = app
