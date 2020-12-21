const router = require('express').Router();
// Firebase
const db = require('../firebase/firebase');

// get client's dictionary
router.route('/:id').get(async (req, res) => {
    let defaultResponse = [];
    await db.collection('dictionary').doc(req.params.id).get().then(doc => {
        if (doc.data()) {
            for (let i = 0; i < doc.data().customerField.length; i++) {
                const selectedItem = {
                    customerField: doc.data().customerField[i],
                    magellanField: doc.data().magellanField[i],
                    customerValue: doc.data().customerValue[i],
                    magellanValue: doc.data().magellanValue[i]
                }
                defaultResponse.push(selectedItem);
            }
        }
    });
    res.json(defaultResponse);
});

// save client's dictionary
router.route('/save').post((req, res) => {
    db.collection('dictionary').doc(req.body.client).set(req.body.dictionaryV)
        .then(() => res.json('Client Dictionary Saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
