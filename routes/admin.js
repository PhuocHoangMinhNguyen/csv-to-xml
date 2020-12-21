const router = require('express').Router();
// Firebase
const db = require('../firebase/firebase');

// get admin list
router.route('/').get((req, res) => {
    let defaultResponse = [];
    db.collection('admins').get().then(querySnapshot => {
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

// create new admin
router.route('/create').post((req, res) => {
    db.collection('admins').add({ email: req.body.email })
        .then(() => res.json('Admin added!.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete admin
router.route('/:id').delete((req, res) => {
    db.collection('admins').doc(req.params.id).delete()
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
