const router = require('express').Router();
// Firebase
const db = require('../firebase/firebase');

// get ftp server list
router.route('/').get(async (req, res) => {
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

// create ftp server
router.route('/create').post((req, res) => {
    db.collection('ftps').add(req.body)
        .then(() => res.json('FTP Server Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// find by id
router.route('/:id').get(async (req, res) => {
    let defaultResponse = {};
    await db.collection('ftps').doc(req.params.id).get()
        .then(documentSnapshot => {
            defaultResponse = documentSnapshot.data()
        });
    res.json(defaultResponse);
});

// delete ftp server
router.route('/:id').delete((req, res) => {
    db.collection('ftps').doc(req.params.id).delete()
        .then(() => res.json('FTP Server Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// edit ftp server
router.route('/edit/:id').post((req, res) => {
    db.collection('ftps').doc(req.params.id).set({
        host: req.body.host,
        port: req.body.port,
        pathInputs: req.body.pathInputs,
        pathProcess: req.body.pathProcess,
        pathError: req.body.pathError,
        pathOutputs: req.body.pathOutputs,
        clientCode: req.body.clientCode,
        user: req.body.user,
        password: req.body.password
    }, { merge: true }).then(() => res.json('Ftp Server edited!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
