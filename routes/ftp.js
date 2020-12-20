const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');

// FTPScreen.js
router.post('/', async (req, res) => {
    console.log(req.body)
    let defaultResponse = [];
    await db.collection('ftps').where('clientCode', '==', req.body.clientCode)
        .get().then(querySnapshot => {
            let docs = querySnapshot.docs
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    host: doc.data().host,
                    port: doc.data().port,
                    pathInputs: doc.data().pathInputs,
                    pathProcess: doc.data().pathProcess,
                    pathError: doc.data().pathError,
                    pathOutputs: doc.data().pathOutputs,
                    clientCode: doc.data().clientCode,
                    user: doc.data().user,
                    password: doc.data().password,
                }
                defaultResponse.push(selectedItem);
            }
        });
    res.json(defaultResponse);
});

// CreateFTP.js
router.post('/create', async (req, res) => {
    await db.collection('ftps').add(req.body);
});

// EditFTP.js
router.post('/edit', async (req, res) => {
    await db.collection('ftps').doc(req.body.id).set({
        host: req.body.host,
        port: req.body.port,
        pathInputs: req.body.pathInputs,
        pathProcess: req.body.pathProcess,
        pathError: req.body.pathError,
        pathOutputs: req.body.pathOutputs,
        clientCode: req.body.clientCode,
        user: req.body.user,
        password: req.body.password
    }, { merge: true });
});

// FTPScreen.js
router.post('/delete', async (req, res) => {
    await db.collection('ftps').doc(req.body.id).delete();
    let defaultResponse = [];
    await db.collection('ftps').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                host: doc.data().host,
                port: doc.data().port,
                pathInputs: doc.data().pathInputs,
                pathProcess: doc.data().pathProcess,
                pathError: doc.data().pathError,
                pathOutputs: doc.data().pathOutputs,
                clientCode: doc.data().clientCode,
                user: doc.data().user,
                password: doc.data().password,
            }
            defaultResponse.push(selectedItem);
        }
    });
    res.json(defaultResponse);
});

module.exports = router;
