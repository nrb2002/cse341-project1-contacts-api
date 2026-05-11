const router = require('express').Router();


//router.use('/', require('./swaggerRoutes'));

router.get('/', (req,res) => {
    //#swagger.tags=['Home Page']
    res.send('Welcome to our Contacts API!');
});

module.exports = router;