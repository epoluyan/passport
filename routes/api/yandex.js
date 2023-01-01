const express = require("express")
const router = express.Router()
const fileMiddleware = require('../../middleware/file')
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

router.get('/profile',
    isAuthenticated,
    (req, res) => {
        res.json({user: req.user});
    }
);

router.get('/login',
    passport.authenticate('yandex')
);

router.get('/logout',
(req, res) => {
        req.logout(),
        res.redirect('/');
    }
);

module.exports = router