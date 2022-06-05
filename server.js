const path = require("path");

const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const express = require("express");
const mongoose = require("mongoose");
const sessions = require("client-sessions");
const cors = require("cors");

const auth = require("./autoryzacja");
const authRoutes = require("./routes/auth");
const mainRoutes = require("./routes/main");
const models = require("./models");
const settings = require("./settings");

let app = express();

// init
mongoose.connect("mongodb://localhost:27017/messenger");

// settings
app.set("view engine", "pug");
app.set("staticDir", path.join(__dirname, "static"));

// middleware
app.use("/static", express.static(app.get("staticDir")));
app.use(sessions({
  cookieName: "session",
  secret: settings.SESSION_SECRET_KEY,
  duration: settings.SESSION_DURATION,
  activeDuration: settings.SESSION_EXTENSION_DURATION,
  cookie: {
    httpOnly: true,
    ephemeral: settings.SESSION_EPHEMERAL_COOKIES,
    secure: settings.SESSION_SECURE_COOKIES
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.loadUserFromSession);
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(authRoutes);
app.use(mainRoutes);
// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke :( Please try again."+err);
});

const server = app.listen(settings.APP_PORT, () => {
  console.log(`App running on port ${settings.APP_PORT}`)
})

const io = require('socket.io')(server, {
  cors: {
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    origin: ["http://localhost:8080", "http://localhost:3000"]
  }
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('nowa-wiadomosc', (message, room) => {
    if(room === ''){
      console.log('room not found!');
    } else {
      io.to(room).emit('nowa-wiadomosc', message);//.tresc.toString());
      let nowa = new models.Wiadomosc();
      nowa.autorId = message.autorId;
      nowa.konwersacjaId = message.konwersacjaId;
      nowa.tresc = message.tresc;
      nowa.wyslano = Date.now();
      nowa.save();
    }
  });

  socket.on('nowa-konfa', (konfa, autor) => {
    if(konfa === ''){
      console.log('error: not found!');
    } else {
      let nowa = new models.Konwersacja();
      nowa.nazwa = konfa.nazwa;
      nowa.uczestnicy = konfa.uczestnicy;
      nowa.save().then(r => {
        models.Konwersacja
            .find({ $and: [ { nazwa: konfa.nazwa }, { uczestnicy: { $all: [konfa.uczestnicy]}} ]}, async (err, docs) => {
              if (err) {
                console.log(err);
              } else {
                await console.log(docs[0]._id.toString());
                io.to(autor).emit('konfa-redirect', autor, docs[0]._id.toString());
              }
            })
            .limit(1);
      });
    }
  });

  socket.on('join-room', room => {
    socket.join(room)
  })

});
