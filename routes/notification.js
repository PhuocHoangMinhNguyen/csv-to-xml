const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');
// Moment
const moment = require('moment');

// Dashboard.js
router.get('/', async (req, res) => {
  let defaultResponse = [];
  await db.collection('notifications').get().then(querySnapshot => {
    let docs = querySnapshot.docs
    for (let doc of docs) {
      const selectedItem = {
        id: doc.id,
        notificationType: doc.data().notificationType,
        client: doc.data().client,
        csvFile: doc.data().csvFile,
        time: moment(doc.data().time.toDate()).format('MMMM Do YYYY, hh:mm a'),
      }
      defaultResponse.push(selectedItem);
    }
  });
  res.json(defaultResponse);
});

module.exports = router;