'use strict';
import { reverseString } from './helpers';

const main = () => {
    process.stdin.on('data', (data) => {
        const inputString = data.toString();

        console.log(
            reverseString(inputString.slice(0, inputString.length - 1)),
        );
    });
};

main();
