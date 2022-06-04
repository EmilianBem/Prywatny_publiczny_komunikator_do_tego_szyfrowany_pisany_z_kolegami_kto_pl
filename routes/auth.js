const bcrypt = require("bcryptjs");
const express = require("express");

const auth = require("../autoryzacja");
const models = require("../models");
const settings = require("../settings");

let router = express.Router();

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post("/register", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
    let user = new models.Uzytkownik(req.body);

    user.save((err) => {
        console.log(err);
        if (err) {
            let error = "Something bad happened! Please try agian.";

            if (err.code === 11000) {
                error = "That email is already taken. Please try another.";
            }

            return res.json({
                error: error,
            });
        }

        auth.createUserSession(req, res, user);
        res.json({});
    });
});


/**
 * Log a user into their account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post("/login", (req, res) => {
    models.Uzytkownik.findOne({ email: req.body.email }, "firstName lastName email password", (err, user) => {
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
                error: "Incorrect email / password."
            });
        }

        auth.createUserSession(req, res, user);
        res.json({});
    });
});

/**
 * Log a user out of their account, then redirect them to the home page.
 */
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.reset();
    }

    res.json({});
});

module.exports = router;
