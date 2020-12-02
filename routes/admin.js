const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');

// AdminList.js
router.get('/admin', async function (req, res, next) {
    let defaultResponse = [];
    await db.collection('admins').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                email: doc.data().email
            }
            defaultResponse.push(selectedItem);
        }
    });
    res.json(defaultResponse);
});

// AdminList.js
router.post('/deleteadmin', async function (req, res, next) {
    await db.collection('admins').doc(req.body.id).delete();
    let defaultResponse = [];
    await db.collection('admins').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                email: doc.data().email
            }
            defaultResponse.push(selectedItem);
        }
    });
    res.json(defaultResponse);
});

// CreateAdmin.js
router.post('/createadmin', async function (req, res, next) {
    await db.collection('admins').add({ email: req.body.email });
});

module.exports = router;
