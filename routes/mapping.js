const express = require('express');
const router = express.Router();
// Firebase
const db = require('../firebase/firebase');

// Mapping.js
router.post('/dic', async (req, res) => {
  let defaultResponse = [];
  await db.collection('dictionary').doc(req.body.id).get().then(doc => {
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

// Mapping.js
router.post('/def', async (req, res) => {
  let defaultResponse = [];
  await db.collection('default value').doc(req.body.id).get().then(doc => {
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

// DropFile.js & EditMapping.js
router.post('/savedic', async (req, res) => {
  await db.collection('dictionary').doc(req.body.client).set(req.body.dictionaryV)
  let defaultResponse = [];
  for (let i = 0; i < req.body.dictionaryV.magellanField.length; i++) {
    const selectedItem = {
      customerField: req.body.dictionaryV.customerField[i],
      magellanField: req.body.dictionaryV.magellanField[i],
      customerValue: req.body.dictionaryV.customerValue[i],
      magellanValue: req.body.dictionaryV.magellanValue[i],
    }
    defaultResponse.push(selectedItem);
  }
  res.json(defaultResponse);
});

// DropFile.js & EditMapping.js
router.post('/savedef', async (req, res) => {
  await db.collection('default value').doc(req.body.client).set(req.body.defaultV)
  let defaultResponse = [];
  for (let i = 0; i < req.body.defaultV.magellanField.length; i++) {
    const selectedItem = {
      magellanField: req.body.defaultV.magellanField[i],
      defaultValue: req.body.defaultV.defaultValue[i],
    }
    defaultResponse.push(selectedItem);
  }
  res.json(defaultResponse);
});

// MappingForm.js
router.post('/formdic', async (req, res) => {
  await db.collection('dictionary').doc(req.body.client).delete()
  await db.collection('dictionary').doc(req.body.client).set(req.body.dictionaryV, { merge: true })
});

// MappingForm.js
router.post('/formdef', async function (req, res, next) {
  await db.collection('default value').doc(req.body.client).set(req.body.defaultV, { merge: true })
});

module.exports = router;
