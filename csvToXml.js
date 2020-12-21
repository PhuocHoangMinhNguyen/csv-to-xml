// CSV to JSON
const csv = require('csvtojson');
// JSON to XML
const { toXML } = require('jstoxml');
// Firebase
const db = require('./firebase/firebase');
// Moment
const moment = require('moment');
// Process File
const path = require('path');
const fs = require('fs');

const data = require("./data/magellanField");
var sendEmail = require('./sendEmail');

runCsvToXML = async (file, clientId, host) => {
    // Read Dictionary Collection
    let dictionaryResponse = [];
    await db.collection('dictionary').doc(clientId).get().then(doc => {
        for (let i = 0; i < doc.data().customerField.length; i++) {
            const selectedItem = {
                customerField: doc.data().customerField[i],
                magellanField: doc.data().magellanField[i],
                customerValue: doc.data().customerValue[i],
                magellanValue: doc.data().magellanValue[i],
            };
            dictionaryResponse.push(selectedItem);
        }
    });

    // Read DefaultValues Collection
    let defaultResponse = [];
    await db.collection('default value').doc(clientId).get().then(doc => {
        for (let i = 0; i < doc.data().magellanField.length; i++) {
            const selectedItem = {
                magellanField: doc.data().magellanField[i],
                defaultValue: doc.data().defaultValue[i],
            };
            defaultResponse.push(selectedItem);
        }
    });

    // Note 0: Deal with cases with '&' sign inside string.
    // CSV to JSON
    const filePath = path.join(__dirname, `ftpserver\\${host}\\IN\\${file}`);
    csv({ noheader: true }).fromFile(filePath).then(csvRows => {
        const toJson = [];
        let actualAttributes = [];
        let countMappingFields = 0;
        csvRows.forEach((aCsvRow, i) => {
            if (i === 0) {
                let temp = [];
                Object.keys(aCsvRow).forEach(aKey => {
                    let found = false
                    dictionaryResponse.forEach(dicRes => {
                        if (aCsvRow[aKey].replace(/\s+/g, '') === dicRes.customerField) {
                            found = true
                            countMappingFields++
                            if (dicRes.magellanField === 'OrderReference') {
                                temp.push({
                                    field: aKey,
                                    value: dicRes.customerField,
                                    special: 'OrderReference'
                                });
                            } else if (dicRes.magellanField === 'OrderLineReference') {
                                temp.push({
                                    field: aKey,
                                    value: dicRes.customerField,
                                    special: 'OrderLineReference'
                                });
                            } else {
                                temp.push({
                                    field: aKey,
                                    value: dicRes.magellanField,
                                    customerValue: dicRes.customerValue,
                                    magellanValue: dicRes.magellanValue,
                                });
                            }
                        }
                    });
                    if (found === false) {
                        temp.push({
                            field: aKey,
                            value: aCsvRow[aKey].replace(/\s+/g, '')
                        });
                    }
                });
                actualAttributes = temp;
            } else {
                const builtObject = {};
                Object.keys(aCsvRow).forEach(aKey => {
                    let valueToAddInBuiltObject
                    let keyToAddInBuiltObject
                    let success = false
                    actualAttributes.forEach(att => {
                        if (aKey === att.field) {
                            if (att.special === 'OrderReference') {
                                keyToAddInBuiltObject = 'OrderReference'
                                valueToAddInBuiltObject = [
                                    att.value,
                                    aCsvRow[aKey],
                                ]
                                success = true
                            } else if (att.special === 'OrderLineReference') {
                                keyToAddInBuiltObject = 'OrderLineReference'
                                valueToAddInBuiltObject = [
                                    att.value,
                                    aCsvRow[aKey],
                                ]
                                success = true
                            } else {
                                keyToAddInBuiltObject = att.value
                                if (aCsvRow[aKey] === att.customerValue) {
                                    valueToAddInBuiltObject = att.magellanValue
                                    success = true
                                }
                            }
                        }
                    });
                    if (success === false) { valueToAddInBuiltObject = aCsvRow[aKey] }
                    builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject
                });
                defaultResponse.forEach(defRes => { builtObject[defRes.magellanField] = defRes.defaultValue });
                toJson.push(builtObject);
            }
        });

        // Error Message 2: Some mapping fields cannot be found in the input file.
        if (countMappingFields < dictionaryResponse.length) {
            const inputpath1 = __dirname + `\\ftpserver\\${host}\\IN\\` + file
            const errorpath = __dirname + `\\ftpserver\\${host}\\ERR\\` + file
            // Write to the error directory
            fs.copyFile(inputpath1, errorpath, function (err) {
                if (err) return console.log(err);
                console.log("The file was saved in error folder");
            });
            // Upload notification on Firebase
            db.collection('notifications').add({
                notificationType: "Some mapping fields cannot be found in the input file.",
                client: clientId,
                csvFile: file,
                time: new Date(),
            }).then(() => {
                const errorMessage = `Error Name: Some mapping fields cannot be found in the input file.\n`;
                const fileMessage = `File Name: ${file}\n`;
                const clientMessage = `From Client: ${clientId}`;
                const message = errorMessage + fileMessage + clientMessage;
                sendEmail(message, file, filePath);
            });
            return console.log('Some mapping fields cannot be found in the input file.');
        }

        // Error Message 3: Check if ALL the mandatory fields exists.
        let customerFields = actualAttributes;
        defaultResponse.forEach(defRes => {
            customerFields.push({
                value: defRes.magellanField
            });
        });
        let mandatoryCount = 0;
        let mandatoryArray = [];
        data.mandatoryHeader.forEach(man => {
            customerFields.forEach(cus => {
                if (man.content === cus.value && !mandatoryArray.includes(man.content)) {
                    console.log(man.content)
                    mandatoryArray.push(man.content);
                    mandatoryCount++
                }
            });
        });
        if (mandatoryCount < data.mandatoryHeader.length) {
            const inputpath1 = __dirname + `\\ftpserver\\${host}\\IN\\` + file
            const errorpath = __dirname + `\\ftpserver\\${host}\\ERR\\` + file
            // Write to the error directory
            fs.copyFile(inputpath1, errorpath, (err) => {
                if (err) return console.log(err);
                console.log("The file was saved in error folder");
            });
            // Upload notification on Firebase
            db.collection('notifications').add({
                notificationType: "Mandatory fields missing",
                client: clientId,
                csvFile: file,
                time: new Date(),
            }).then(() => {
                const errorMessage = `Error Name: Mandatory fields missing\n`;
                const fileMessage = `File Name: ${file}\n`;
                const clientCode = `From Client: ${clientId}\n`;
                const timeMessage = `Time: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`;
                const message = errorMessage + fileMessage + clientCode + timeMessage;
                sendEmail(message, file, filePath);
            });
            return console.log('mandatory fields missing');
        }

        // JSON to XML
        let customerOrder = [];
        let existingOrderNumber = '';
        let orderLines = [];
        for (let i = 0; i < toJson.length; i++) {
            let result = []
            Object.keys(toJson[i]).map(key => (
                result.push({
                    _name: key,
                    _content: toJson[i][key],
                })
            ));

            // Order Header
            let orderHeaderContent = [];
            let orderDelivery = [];
            let orderReference = [];
            let OrderMilestoneDates = [];

            // Order Line
            let orderLine = [];
            let orderLineDelivery = [];
            let orderLineReference = [];
            let OrderLineMilestoneDates = [];

            for (let i = 0; i < result.length; i++) {
                data.header.forEach(headerData => {
                    if (result[i]._name === headerData.content) {
                        const replaceStr = result[i]._content.replace('&', '_');
                        orderHeaderContent[headerData.id] = {
                            _name: result[i]._name,
                            _content: replaceStr,
                        }
                    }
                });
                if (result[i]._name === 'DeliveryAddressCode') {
                    const replaceStr = result[i]._content.replace('&', '_');
                    orderDelivery.push({
                        DeliveryAddress: {
                            _name: result[i]._name,
                            _content: replaceStr,
                        }
                    });
                }
                if (result[i]._name === 'OrderReference') {
                    const replaceStr1 = result[i]._content[0].replace('&', '_');
                    const replaceStr2 = result[i]._content[1].replace('&', '_');
                    orderReference.push({
                        OrderReference: {
                            OrderReferenceName: replaceStr1,
                            OrderReferenceValue: replaceStr2,
                        }
                    });
                }
                // For OrderMilestoneDates
                if (result[i]._name === 'EstimatedOSAgentConfirmation' || result[i]._name === 'ActualOSAgentConfirmation'
                    || result[i]._name === 'EstimatedSupplierConfirmation' || result[i]._name === 'ActualSupplierConfirmation'
                    || result[i]._name === 'EstimatedExFactoryDate' || result[i]._name === 'ActualExFactoryDate') {
                    const replaceStr = result[i]._content.replace('&', '_');
                    OrderMilestoneDates.push({
                        _name: result[i]._name,
                        _content: replaceStr,
                    });
                }
                data.line.forEach(lineData => {
                    if (result[i]._name === lineData.content) {
                        const replaceStr = result[i]._content.replace('&', '_');
                        orderLine[lineData.id] = {
                            _name: result[i]._name,
                            _content: replaceStr,
                        }
                    }
                });
                if (result[i]._name === 'LineDeliveryAddress') {
                    const replaceStr = result[i]._content.replace('&', '_');
                    orderLineDelivery.push({
                        LineDeliveryAddress: {
                            _name: result[i]._name,
                            _content: replaceStr,
                        }
                    });
                }
                if (result[i]._name === 'OrderLineReference') {
                    const replaceStr1 = result[i]._content[0].replace('&', '_');
                    const replaceStr2 = result[i]._content[1].replace('&', '_');
                    orderLineReference.push({
                        OrderLineReference: {
                            OrderLineReferenceName: replaceStr1,
                            OrderLineReferenceValue: replaceStr2,
                        }
                    });
                }
                // For OrderLineMilestoneDates
                if (result[i]._name === 'EstimatedExFactoryLine' || result[i]._name === 'ActualExFactoryLine') {
                    const replaceStr = result[i]._content.replace('&', '_');
                    OrderLineMilestoneDates.push({
                        _name: result[i]._name,
                        _content: replaceStr,
                    });
                }
                // For OrderNote
            }

            const orderMilestoneDates = {
                OrderMilestoneDates: OrderMilestoneDates
            };

            const orderLineMilestoneDates = {
                OrderLineMilestoneDates: OrderLineMilestoneDates
            };

            // OrderHeader Level (Third Level)
            const orderHeader = [
                orderHeaderContent,
                orderDelivery,
                orderReference,
                orderMilestoneDates
            ];

            // Check if OrderNumber of the processing line already exists?
            let found = false
            if (orderHeaderContent[1]._name === 'OrderNumber' && existingOrderNumber === orderHeaderContent[1]._content) {
                found = true
                orderLines.push({
                    OrderLine: [
                        orderLine,
                        orderLineReference,
                        orderLineMilestoneDates
                    ]
                });
            }
            // OrderLines Level (Third Level)
            if (found === false) {
                if (orderHeaderContent[1]._name === 'OrderNumber') {
                    existingOrderNumber = orderHeaderContent[1]._content
                    orderLines = []
                    orderLines.push({
                        OrderLine: [
                            orderLine,
                            orderLineReference,
                            orderLineMilestoneDates
                        ]
                    });
                }
            }

            // CustomerOrder Level (Second Level)
            if (found === false) {
                customerOrder.push({
                    CustomerOrder: [orderHeader, {
                        _name: 'OrderLines',
                        _content: orderLines
                    }]
                });
            }
        }
        const xmlContent = toXML(
            {
                // CustomerOrders Level (First Level)
                CustomerOrders: customerOrder
            },
            {
                header: true,
                indent: '     '
            }
        );
        // Set New File Name to write to local xml directory
        const csvFilename = file.split('.').slice(0, -1).join('.');
        const xmlFilename = csvFilename + ".xml"
        const processpath = __dirname + `\\ftpserver\\${host}\\PROC\\` + file
        const outputpath = __dirname + `\\ftpserver\\${host}\\OUT\\` + xmlFilename
        const inputpath2 = __dirname + `\\ftpserver\\${host}\\IN\\` + file
        // Write to the process directory
        fs.copyFile(inputpath2, processpath, (err) => {
            if (err) return console.log(err);
            console.log("The file was saved in process folder");
        });
        // Write to the output directory
        fs.writeFile(outputpath, xmlContent, (err) => {
            if (err) return console.log(err);
            console.log("The file was saved in output folder");
        });
        // Upload notification on Firebase
        db.collection('notifications').add({
            notificationType: "Success",
            client: clientId,
            csvFile: file,
            time: new Date(),
        });
        return console.log('success');
    });
}

module.exports = runCsvToXML;