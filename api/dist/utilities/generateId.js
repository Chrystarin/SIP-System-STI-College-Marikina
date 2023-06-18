"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPassword = exports.genSIPid = void 0;
const buffer_1 = require("buffer");
const crypto_1 = require("crypto");
const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzric';
const hexToBuffer = (n) => {
    let hex = n.toString(16);
    hex = '0'.repeat(hex.length % 2) + hex;
    return buffer_1.Buffer.from(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));
};
const nonceToBuffer = (n) => buffer_1.Buffer.from([...hexToBuffer(n)]
    .map((b) => `${alphabet[b >> 6]}${alphabet[b & 6]}`)
    .join(''), 'utf-8');
const bufferToString = (b) => [...b].map((b) => alphabet[b & 63]).join('');
let SIPnonce = 0;
const genSIPid = () => bufferToString(buffer_1.Buffer.concat([
    (0, crypto_1.randomBytes)(8),
    hexToBuffer(Date.now()),
    nonceToBuffer(++SIPnonce),
]));
exports.genSIPid = genSIPid;
const genPassword = () => bufferToString(buffer_1.Buffer.concat([(0, crypto_1.randomBytes)(5), hexToBuffer(Date.now()).subarray(3)]));
exports.genPassword = genPassword;
