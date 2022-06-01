const mongoose = require("mongoose");

module.exports.Uzytkownik = mongoose.model("Uzytkownik", new mongoose.Schema({
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  photoUrl:     { type: String},
  publicKey:    { type: String, required: true},
  salt:         { type: String, required: true}
}));

module.exports.Konwersacja = mongoose.model("Konwersacja", new mongoose.Schema({
  nazwa:   { type: String, required: true},
  uczestnicy :    { type: Array, required: true }
}));

module.exports.Wiadomosc = mongoose.model("Wiadomosc", new mongoose.Schema({
  autorId:    { type: String, required: true },
  konwersacjaId:    { type: String, required: true },
  tresc:    { type: String, required: true },
  wyslano:    { type: String, required: true }
}));
