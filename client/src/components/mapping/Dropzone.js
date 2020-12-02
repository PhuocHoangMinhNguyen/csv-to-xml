// Decide how the dropzone inside drop file screen reads data.

import React from 'react';
import RDropzone from 'react-dropzone';
const csv = require('csvtojson');

class Dropzone extends React.Component {
    state = {
        files: [],
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.setState({
            files: acceptedFiles
        });

        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                const fileAsBinaryString = reader.result;

                csv({ noheader: true, output: "json" })
                    .fromString(fileAsBinaryString)
                    .then(csvRows => {
                        const toJson = []
                        csvRows.forEach((aCsvRow, i) => {
                            if (i !== 0) {
                                const builtObject = {}
                                Object.keys(aCsvRow).forEach(aKey => {
                                    const valueToAddInBuiltObject = aCsvRow[aKey].replace(/\s+/g, '');
                                    const keyToAddInBuiltObject = csvRows[0][aKey].replace(/\s+/g, '');
                                    builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                                })
                                toJson.push(builtObject);
                            }
                        });
                        const { getjson } = this.props;
                        getjson(toJson);
                    })
            };

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsText(file, 'ISO-8859-1');
        });
    };

    render() {
        const { children } = this.props
        return (
            <div>
                <section style={{ justifyContent: "center", display: "flex" }}>
                    <RDropzone onDrop={this.onDrop} {...this.props}>
                        {children}
                    </RDropzone>
                </section>
                <div>{this.state.files.map(f => <div key={f.name}>File Name: {f.name} - {f.size} bytes</div>)}</div>
            </div>
        );
    }
}

export default Dropzone