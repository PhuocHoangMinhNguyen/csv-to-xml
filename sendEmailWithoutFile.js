// Email
const nodeoutlook = require('nodejs-nodemailer-outlook');
// Firebase
const db = require('./firebase/firebase');

function sendEmailWithoutFile(message) {
    db.collection('admins').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        for (let doc of docs) {
            nodeoutlook.sendEmail({
                auth: {
                    user: "phuochoangminh@outlook.com.au",
                    pass: 'Ngoclinh2906'
                },
                from: 'phuochoangminh@outlook.com.au',
                to: doc.data().email,
                subject: 'CSV to XML System Error',
                text: message,
                onError: (e) => console.log(e),
                onSuccess: (i) => console.log(i)
            });
        }
    });
}

module.exports = sendEmailWithoutFile;