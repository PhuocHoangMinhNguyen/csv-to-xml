// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Schedule a job
const cron = require("node-cron");
// Download from and Upload to FTP server
const ftp = require("basic-ftp");
// Process File
const fs = require('fs');
// Firebase
const db = require('./firebase/firebase');
// Remove Folder
const rimraf = require('rimraf');
// Moment
const moment = require('moment');

var notificationRouter = require('./routes/notification');
var clientRouter = require('./routes/client');
var ftpRouter = require('./routes/ftp');
var adminRouter = require('./routes/admin');
var dictionaryRouter = require('./routes/dictionary');
var defaultRouter = require('./routes/defaultvalue');

var runCsvToXML = require('./csvToXml');
var sendEmailWithoutFile = require('./sendEmailWithoutFile');

// Create a new express application named 'app'
const app = express();

csvToXml = (clientCode, host) => {
    // Process Path
    const processpath = path.join(__dirname, `\\ftpserver\\${host}\\PROC\\`);
    const errorpath = path.join(__dirname, `\\ftpserver\\${host}\\ERR\\`);
    const outputpath = path.join(__dirname, `\\ftpserver\\${host}\\OUT\\`);

    fs.mkdir(processpath, (err) => {
        if (err) return console.error(err);
        console.log('Process directory created sucessfully');
    });

    fs.mkdir(errorpath, (err) => {
        if (err) return console.error(err);
        console.log('Error directory created sucessfully');
    });

    fs.mkdir(outputpath, (err) => {
        if (err) return console.error(err);
        console.log('Output directory created sucessfully');
    });

    const directoryPath = path.join(__dirname, `ftpserver\\${host}\\IN`);
    fs.readdir(directoryPath, (err, files) => {
        if (err) return console.log("Unable to scan directory: " + err);
        files.forEach(file => runCsvToXML(file, clientCode, host));
    })
}

readFromFTP = async (doc) => {
    const client = new ftp.Client();
    client.ftp.verbose = false
    try {
        await client.access({
            host: doc.host,
            port: doc.port,
            user: doc.user,
            password: doc.password,
            secure: false
        });
        console.log(await client.list());

        // Download from remote input directory to local input directory
        // Problem: If downloading lots of file, it will take a lot of time. 
        // Meanwhile, client can add some new files while the old files are being downloaded.
        await client.downloadToDir(`ftpserver\\${doc.host}\\IN`, doc.pathInputs);
        // Delete input folder.
        await client.ensureDir(doc.pathInputs);
        await client.clearWorkingDir().then(() => csvToXml(doc.clientCode, doc.host));
    }
    catch (err) {
        // Error Message 1: Cannot Connect to FTP Server
        db.collection('notifications').add({
            notificationType: `Cannot connect to FTP server ${doc.host}`,
            client: '',
            csvFile: '',
            time: new Date(),
        }).then(() => {
            const errorMessage = `Error Name: Cannot connect to FTP server ${doc.host}\n`;
            const clientMessage = `From Client: ${doc.clientCode}\n`;
            const timeMessage = `Time: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`;
            const message = errorMessage + clientMessage + timeMessage;
            sendEmailWithoutFile(message);
        });
    }
    client.close();
}

uploadtoFTP = async (doc) => {
    const client = new ftp.Client();
    client.ftp.verbose = false
    try {
        await client.access({
            host: doc.host,
            port: doc.port,
            user: doc.user,
            password: doc.password,
            secure: false
        });
        console.log(await client.list());

        // Upload from local directories to remote directories
        await client.uploadFromDir(`ftpserver\\${doc.host}\\PROC`, doc.pathProcess);
        await client.uploadFromDir(`ftpserver\\${doc.host}\\ERR`, doc.pathError);
        await client.uploadFromDir(`ftpserver\\${doc.host}\\OUT`, doc.pathOutputs);

        // Clear local ftpserver directory
        const thePath = path.join(__dirname, `ftpserver\\${doc.host}`);
        rimraf(thePath, () => console.log('Deleted Local Host Address Directory'));
    }
    catch (err) { console.log(err) }
    client.close();
}

// cron job every minute
// Optimize Idea 1: Should read 1 file at a time to prevent the case that 
// the client was entering a new input file while the system is processing.
cron.schedule("* * * * *", () => {
    console.log("Running Cron Job");
    // Delete notification's documents that are older than 1 year
    const now = Date.now();
    // Every 10 minutes
    const cutoff = new Date(now - 10 * 60 * 1000);
    db.collection('notifications').orderBy('time').endAt(cutoff).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        });

    // Main function
    db.collection('ftps').get().then(querySnapshot => {
        let docs = querySnapshot.docs
        // Problem: Currently can only run with 1 FTP server.
        for (let doc of docs) {
            readFromFTP(doc.data());
            setTimeout(() => uploadtoFTP(doc.data()), 5000);
        }
    });
});

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the CORs middleware
app.use(cors());

app.use('/notifications', notificationRouter);
app.use('/clients', clientRouter);
app.use('/ftps', ftpRouter);
app.use('/admins', adminRouter);
app.use('/dictionary', dictionaryRouter);
app.use('/defaultvalue', defaultRouter);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({ msg: 'Catch All' });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
