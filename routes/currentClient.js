const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');

// ClientSummary.js
router.post('/postcurrentclient', async function (req, res, next) {
    console.log("Post: " + req.body.id);
    await db.collection('currentClient').doc('currentClient').set({
        clientCode: req.body.id
    }, { merge: true });
});

// FTPScreen.js
router.get('/getcurrentclient', async function (req, res, next) {
    let defaultResponse = {};
    await db.collection('currentClient').doc('currentClient').get().then(doc => {
        defaultResponse = doc.data();
    });
    console.log("Get: " + defaultResponse.clientCode)
    res.json(defaultResponse);
});

module.exports = router;