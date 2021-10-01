'use strict';
const { createInterface } = require('readline');
const { reverseString } = require('./helpers');

const main = () => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    readline.on('line', (chunk) => {
        console.log(reverseString(chunk));
    });
};

main();
