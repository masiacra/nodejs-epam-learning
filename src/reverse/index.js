'use strict';
import { createInterface } from 'readline';
import { reverseString } from './helpers';

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
