const express = require('express');

const auth = require('../autoryzacja');
const models = require("../models");

let router = express.Router();

/**
 * Render the home page.
 */
router.get("/", (req, res) => {
    res.render("index");
});

/**
 * Render the dashboard page.
 */
router.get("/user", auth.loginRequired, (req, res) => {
    let userString = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user._id,
        photo: req.user.photoUrl
    };

    models.Konwersacja.find({ uczestnicy: userString.id.toString()}, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            let konwersacjeArr = []
            for(let x in docs){
                konwersacjeArr[x] = {
                    _id: docs[x]._id,
                    nazwa: docs[x].nazwa,
                    uczestnicy: docs[x].uczestnicy,
                    userPhoto: userString.photo
                }
            }

            res.json({
                userPhoto: userString.photo,
                userString: JSON.stringify(userString, null, 2),
                userId: req.user._id,
                konwersacjeString: JSON.stringify(konwersacjeArr, null, 2),
                konwersacjeArr: konwersacjeArr,
            });
        }
    });
});

/**
 * Render the messaging page.
 */
router.get("/messages", (req, res) => {
    let userString = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user._id,
        photo: req.user.photoUrl
    };
    let konfaId = req.query.konfaId;

    let wiadomosciString = [];

    models.Wiadomosc.find({konwersacjaId: konfaId}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            for (const x in docs) {
                wiadomosciString[x] = {
                    _id: docs[x]._id,
                    autorId: docs[x].autorId,
                    konwersacjaId: docs[x].konwersacjaId,
                    tresc: docs[x].tresc,
                    wyslano: docs[x].wyslano
                }
            }
            models.Konwersacja.findOne({"_id": konfaId}, (err, data) => {
                console.log(data);
                if (data === undefined) {
                    res.json({"error": 1});
                    return;
                }
                data.uczestnicy = data.uczestnicy.filter((el) => el !== req.user._id);
                models.Uzytkownik.findOne({"_id": data.uczestnicy[0]}, (err, data) => {
                    res.json({
                        userString: JSON.stringify(userString, null, 2),
                        wiadomosciString: wiadomosciString,//: JSON.stringify(wiadomosciString, null, 2)
                        konfaId: konfaId,
                        userId: userString,
                        pKey: data.publicKey,
                    });
                })
            })
        }
    });
});

/**
 * * Render the nowaKonfa page.
 */
router.get("/nowaKonfa", (req, res) => {
    let userString = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user._id,
        photo: req.user.photoUrl
    };

    let uzytkownicy = {};

    models.Uzytkownik.find({_id: {$ne: userString.id} }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            for (const x in docs) {
                uzytkownicy[x] = {
                    //to do
                }
            }
            res.render("nowaKonfa", {
                userString: JSON.stringify(userString, null, 2),
                uzytkownicy: uzytkownicy,
                userId: userString
            });
        }
    });
});

module.exports = router;

