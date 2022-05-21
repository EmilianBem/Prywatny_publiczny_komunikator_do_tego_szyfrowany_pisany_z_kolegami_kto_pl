const express = require('express');

const auth = require('../auth');
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
router.get("/dashboard", auth.loginRequired, (req, res) => {
    let userString = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    };
    models.Konwersacja.find({
        "uczestnicy._id": req.user._id
    }, (err, result) => {
        if (err)
            req.send(err)
        else
            res.render("dashboard", {
                userString: JSON.stringify(userString, null, 2),
                konwersacjeArr: result
            });
    })
});

module.exports = router;
