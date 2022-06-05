if (runImportPrivateKey === undefined){
    function runImportPrivateKey(){}
    importPrivateKey(loadKey()).then((privateKey) => {
        fetch("http://localhost:4000/messages?konfaId="+new URLSearchParams(window.location.search).get("id"), {
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })
            .then(response => response.json()
                .then(response => {
                    let wiadomosci = response.wiadomosciString;
                    let room = response.konfaId;
                    let userId = response.userId.id;
                    let pKey = response.pKey;
                    const socket = io("ws://localhost:4000");

                    importPublicKey(JSON.parse(pKey)).then((k) => {
                        $('form').submit((e) => {
                            let textMessage = $('#message').val();
                            if (textMessage === "")
                                return;
                            encrypt(textMessage, k).then((msg) => {
                                let message = {};
                                message.autorId = userId;
                                message.konwersacjaId = room;
                                message.tresc = msg;

                                socket.emit('nowa-wiadomosc', message, room);
                            });
                            $('.jumbotron').last().append($('<pre class="prawo">' +
                                "<img src=" + response.userString.photoUrl + " />").text(textMessage));
                            $('#message').val('');
                            return false;
                        });
                    })

                    for (let msg of wiadomosci){
                        decrypt(new Uint8Array(msg.tresc.data), privateKey).then((decryptedMsg) => {
                            if (msg._id !== userId)
                                $('.jumbotron').last().append($('<pre class="lewo">').text(buf2str(decryptedMsg)));
                            else {
                                // jak odszyfrować własne wiadomości?
                            }
                        });
                    }

                    socket.emit('join-room', room);

                    socket.on('nowa-wiadomosc', (message) => {
                        if (message.autorId !== userId) {
                            decrypt(message.tresc, privateKey).then((msg) => {
                                $('.jumbotron').last().append($('<pre class="lewo">').text(buf2str(msg)));
                            });
                        }
                    });
                }))
            .catch(err => {
                console.log(err);
            });
    });
}