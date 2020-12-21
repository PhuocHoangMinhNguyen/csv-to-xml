const router = require('express').Router();
// Firebase
const db = require('../firebase/firebase');

// get client's default values
router.route('/:id').get(async (req, res) => {
    let defaultResponse = [];
    await db.collection('default value').doc(req.params.id).get().then(doc => {
        if (doc.data()) {
            for (let i = 0; i < doc.data().magellanField.length; i++) {
                const selectedItem = {
                    magellanField: doc.data().magellanField[i],
                    defaultValue: doc.data().defaultValue[i],
                }
                defaultResponse.push(selectedItem);
            }
        }
    });
    res.json(defaultResponse);
});

// save client's default value
router.route('/save').post((req, res) => {
    db.collection('default value').doc(req.body.client).set(req.body.defaultV)
        .then(() => res.json('Client Default Value Saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
