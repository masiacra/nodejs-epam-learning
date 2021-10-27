import { createReadStream, createWriteStream, mkdir } from 'fs';
import csv from 'csvtojson';
import { INPUT_FILEPATH, OUTPUT_FILEPATH, TXT_DIR } from './constants';
import { promisify } from 'util';

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

const promisifiedMkdir = promisify(mkdir);

promisifiedMkdir(TXT_DIR).then(main).catch(console.error);
