const { Lecture } = require('./Models');
const { db } = require('./db/db.config');
require('dotenv').config();

const MEDIA_URL = process.env.MEDIA_URL; 

async function fetchCourses() {
    const courses = (await db.collection('courses').get()).data()
    return courses;
}

async function fetchLectures() {
    const lectures = (await db.collection('lectures').get()).data()
    return lectures;
}

async function saveLecture(req, res) {
    const { startTime, endTime, attendance } = req.body;
    const courseId = req.params.id;
    const mediaURL = `${MEDIA_URL}${courseId}.webm`;

    const lecture = new Lecture(courseId, startTime, endTime, attendance, mediaURL);
    console.log(lecture.get());

    await db.collection('lectures').add({ ...lecture.get() });
    
    res.send('Upload successfull!').end()
}


module.exports = {
    fetchCourses,
    fetchLectures,
    saveLecture
}