'use strict';

const { createReadStream, createWriteStream } = require('fs');
const csv = require('csvtojson');
const { INPUT_FILEPATH, OUTPUT_FILEPATH } = require('./constants');

const main = () => {
    const readStream = createReadStream(process.argv[2] || INPUT_FILEPATH, {
        highWaterMark: 10,
    });

    const writeStream = createWriteStream(
        process.argv[3] || OUTPUT_FILEPATH,
        'utf-8',
    );

    readStream.pipe(csv()).pipe(writeStream);

    readStream.on('error', (error) => {
        console.log('problem with reading file');

        console.error(error);
    });

    writeStream.on('error', (error) => {
        console.log('problem with writing file');

        console.error(error);
    });
};

main();
