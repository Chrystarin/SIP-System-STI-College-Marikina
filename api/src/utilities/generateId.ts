import { Buffer } from 'buffer';
import { randomBytes } from 'crypto';

const alphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzric';

// This function takes a number and returns a Buffer object
const hexToBuffer = (n: number): Buffer => {
    // Convert the number to its hexadecimal representation
    let hex = n.toString(16);

    // If the hexadecimal representation has an odd number of characters, add a leading zero
    hex = '0'.repeat(hex.length % 2) + hex;

    // Create a Buffer object from an array of integers representing each pair of hexadecimal characters
    return Buffer.from(
        (<RegExpMatchArray>hex.match(/.{2}/g)).map((byte) => parseInt(byte, 16))
    );
};

const nonceToBuffer = (n: number): Buffer =>
    Buffer.from(
        [...hexToBuffer(n)]
            .map((b) => `${alphabet[b >> 6]}${alphabet[b & 6]}`)
            .join(''),
        'utf-8'
    );

const bufferToString = (b: Buffer): string =>
    [...b].map((b) => alphabet[b & 63]).join('');

let SIPnonce = 0;
const genSIPid = (): string =>
    bufferToString(
        Buffer.concat([
            randomBytes(8),
            hexToBuffer(Date.now()),
            nonceToBuffer(++SIPnonce),
        ])
    );

const genPassword = (): string =>
    bufferToString(
        Buffer.concat([randomBytes(5), hexToBuffer(Date.now()).subarray(3)])
    );

export { genSIPid, genPassword };
