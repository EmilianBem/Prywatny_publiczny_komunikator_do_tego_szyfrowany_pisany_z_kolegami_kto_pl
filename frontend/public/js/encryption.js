const ALGORITHM = {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
};


function str2buf(str){
    let buf = new ArrayBuffer(str.length*2);
    let bufView = new Uint16Array(buf);
    for (let i = 0; i < str.length; i++){
        bufView[i] = str.charCodeAt(i);
    }
    return buf
}


function buf2str(buf){
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}


async function generateKeyPair(){
    return window.crypto.subtle.generateKey(
        ALGORITHM,
        true,
        ["encrypt", "decrypt"]
    )
}


async function encrypt(message, key){
    return window.crypto.subtle.encrypt(ALGORITHM.name, key, str2buf(message));
}


async function decrypt(message, key){
    return window.crypto.subtle.decrypt(ALGORITHM.name, key, message);
}


async function exportKey(key){
    return window.crypto.subtle.exportKey("jwk", key);
}


async function importPublicKey(key){
    return window.crypto.subtle.importKey("jwk", key, ALGORITHM, true, ['encrypt']);
}


async function importPrivateKey(key){
    return window.crypto.subtle.importKey("jwk", key, ALGORITHM, true, ['decrypt']);
}


async function saveKey(key){
    exportKey(key).then((k) => {
        localStorage.setItem("pKey", JSON.stringify(k));
    })
}


function loadKey(){
    return JSON.parse(localStorage.getItem("pKey"));
}