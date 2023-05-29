const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const createSignature = (message, privateKey) => {
    const messageHash = keccak256(utf8ToBytes(message));
    const signature = secp256k1.sign(messageHash, privateKey);
    return signature;
};

const getPublicKey = (privateKey) => {
    const publicKey = secp256k1.getPublicKey(privateKey);
    return publicKey;
};

const getAddress = (publicKey) => {
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
    return '0x' + address;
};

const verifySignature = (messageHash, signature, publicKey) => {
    const valid = secp256k1.verify(signature, messageHash, publicKey);
    return valid;
};

const privKey = "25218e50275fd4b077c1c47a15c91a7b14630d1a2be76821942b99eaaf4f7627"

const signature = createSignature("Hello, world!", privKey);
const msghash =  keccak256(utf8ToBytes("Hello, world!"));
const publicKey = getPublicKey(privKey);
const address = getAddress(publicKey);
const valid = verifySignature(msghash, signature, publicKey);
console.log(valid);


module.exports = 
    {
        createSignature,
        getPublicKey,
        getAddress,
        verifySignature
    };