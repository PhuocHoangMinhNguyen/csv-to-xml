const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');

// ClientList.js & DropFile.js
router.get('/', async (req, res) => {
    let defaultResponse = [];
    await db.collection('clients').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                clientName: doc.data().clientName
            }
            defaultResponse.push(selectedItem);
        }
    });
    res.json(defaultResponse);
});

// CreateClient.js
router.post('/create', async (req, res) => {
    await db.collection('clients').doc(req.body.clientCode).set({
        clientName: req.body.clientName
    });
});

// EditClient.js
router.post('/edit', async (req, res) => {
    await db.collection('clients').doc(req.body.id).set({
        clientName: req.body.clientName
    }, { merge: true });
});

// ClientList.js
router.post('/delete', async (req, res) => {
    await db.collection('dictionary').doc(req.body.id).delete();
    await db.collection('default value').doc(req.body.id).delete();
    await db.collection('clients').doc(req.body.id).delete();
    let defaultResponse = [];
    await db.collection('clients').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                clientName: doc.data().clientName
            }
            defaultResponse.push(selectedItem);
        }
    });
    res.json(defaultResponse);
});

module.exports = router;
