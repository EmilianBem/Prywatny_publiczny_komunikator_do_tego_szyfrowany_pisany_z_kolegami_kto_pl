const crypto = require("crypto");

/**
 *
 * @param message {string}
 * @param key {string}
 * @param salt {string}
 * @returns {string}
 */
function encrypt(message, key, salt){
    let encrypter = crypto.createCipheriv("aes-256-cbc", key, salt);
    let encryptedMsg = encrypter.update(message, "utf8", "hex");
    encryptedMsg += encrypter.final("hex");

    return encryptedMsg;
}

/**
 *
 * @param message {string}
 * @param key {string}
 * @param salt {string}
 * @returns {string}
 */
function decrypt(message, key, salt){
    const decrypter = crypto.createDecipheriv("aes-256-cbc", key, salt);
    let decryptedMsg = decrypter.update(message, "hex", "utf8");
    decryptedMsg += decrypter.final("utf8");

    return decryptedMsg;
}

module.exports = {
    encrypt,
    decrypt
}