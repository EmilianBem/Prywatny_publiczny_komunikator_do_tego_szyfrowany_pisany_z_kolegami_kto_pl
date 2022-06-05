if (runGenerateKeyPair === undefined){
    function runGenerateKeyPair(){
        generateKeyPair().then((keys) => {
            saveKey(keys.privateKey);
            exportKey(keys.publicKey).then((key) => {
                $("#publicKey")[0].value = JSON.stringify(key);
            })
        });
    }
    runGenerateKeyPair();
}


