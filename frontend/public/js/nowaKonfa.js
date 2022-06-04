fetch("http://localhost:4000/user", {
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
})
    .then(response => response.json()
        .then(response => {
            let userId = response.userId;
            const socket = io("ws://localhost:4000");

            $('form').submit(() => {
                let konfa = {};
                konfa.nazwa = $('#nazwa').val();
                if (konfa.nazwa === "")
                    return;
                konfa.uczestnicy = [userId, $('#odbiorcy').val()];

                socket.emit('join-room', userId);
                socket.emit('nowa-konfa', konfa, userId);

                return false;
            });

            socket.on('konfa-redirect', (autor, room) => {
                if (!room) {
                    console.log('error: no room');
                    return false;
                }
                if (autor !== userId) return false;
                window.location.href = '/messaging/?konfaId=' + room;
            });

        }))
    .catch(err => {
        console.log(err);
    });