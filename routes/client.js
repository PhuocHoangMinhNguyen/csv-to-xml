const router = require('express').Router();
// Firebase
const db = require('../firebase/firebase');

// get client list
router.route('/').get(async (req, res) => {
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

// create client
router.route('/create').post((req, res) => {
    db.collection('clients').doc(req.body.clientCode).set({
        clientName: req.body.clientName
    }).then(() => res.json('Client added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// find by id
router.route('/:id').get(async (req, res) => {
    let defaultResponse = null;
    await db.collection('clients').doc(req.params.id).get()
        .then(documentSnapshot => {
            const selectedItem = {
                id: documentSnapshot.id,
                clientName: documentSnapshot.data().clientName
            }
            defaultResponse = selectedItem;
        });
    res.json(defaultResponse);
});

// delete client
router.route('/:id').delete(async (req, res) => {
    db.collection('dictionary').doc(req.params.id).delete();
    db.collection('default value').doc(req.params.id).delete();
    db.collection('clients').doc(req.params.id).delete();
});

// edit client
router.route('/edit/:id').post((req, res) => {
    db.collection('clients').doc(req.params.id).set({
        clientName: req.body.clientName
    }, { merge: true }).then(() => res.json('Client edited!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
