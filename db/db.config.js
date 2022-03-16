const admin = require("firebase-admin");
require('dotenv').config()

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.CLIENT_EMAIL
    })
 });

const db = admin.firestore();

module.exports = { db };
