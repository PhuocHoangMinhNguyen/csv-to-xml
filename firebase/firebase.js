// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./csv-to-xml-ee901-firebase-adminsdk-gkkqc-1e6338e5e9.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
