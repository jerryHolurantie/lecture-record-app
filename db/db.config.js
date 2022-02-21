// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
const { firebaseConfig } = require('./db.secret');

const app = initializeApp({ ...firebaseConfig });

const db = getFirestore(app);

module.exports = { db };