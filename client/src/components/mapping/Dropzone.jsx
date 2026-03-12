// Decide how the dropzone inside drop file screen reads data.

import React from 'react';
import RDropzone from 'react-dropzone';
import Papa from 'papaparse';

class Dropzone extends React.Component {
    state = {
        files: [],
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.setState({
            files: acceptedFiles
        });

        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                const fileAsBinaryString = reader.result;

                const { data: csvRows } = Papa.parse(fileAsBinaryString, { header: false, skipEmptyLines: true });
                const headers = csvRows[0].map(h => h.replace(/\s+/g, ''));
                const toJson = [];
                for (let i = 1; i < csvRows.length; i++) {
                    const builtObject = {};
                    csvRows[i].forEach((value, j) => {
                        builtObject[headers[j]] = value.replace(/\s+/g, '');
                    });
                    toJson.push(builtObject);
                }
                const { getjson } = this.props;
                getjson(toJson);
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
                    <RDropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {children}
                            </div>
                        )}
                    </RDropzone>
                </section>
                <div>{this.state.files.map(f => <div key={f.name}>File Name: {f.name} - {f.size} bytes</div>)}</div>
            </div>
        );
    };
};

export default Dropzone;