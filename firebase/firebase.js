// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./csv-to-xml-ee901-firebase-adminsdk-gkkqc-0886dfba26.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;