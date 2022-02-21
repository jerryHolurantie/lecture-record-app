// install express with `npm install express` 
const express = require('express')
const { upload } = require('./multer')
const { fetchLectures, fetchCourses, saveLecture } = require('./logic')
require('dotenv').config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 5500

app.get('/', async (req, res) => {
  res.render('index', { courses: {} })
})

app.get('/record/:id', async (req, res) => res.render('record'))

app.get('/admin', async (req, res) => res.render('admin', { lectures: {} }))

app.post('/update-recording/:id', upload.single('recording'), (req, res) => {
  saveLecture(req, res);
})

// app.post('/new-course', (req, res) => {
//     createNewCourse(req, res);
// })

// app.post('/new-lecture', (req, res) => {
//     createNewLecture(req, res);
// })

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`)})

// export 'app'
module.exports = app