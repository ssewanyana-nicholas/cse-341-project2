const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //swagger.tags = ['Hello world']
    res.send('Hello World!');
});

router.use('/user1', require('./user1'));

module.exports = router;