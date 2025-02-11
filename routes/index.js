const passport = require('passport');
const router = require('express').Router();



router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Your logged out');
});

router.use('/user1', require('./user1'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;