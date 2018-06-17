const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter  = express.Router();
function router () {
    authRouter.route('/SignUp').post((req, res) => {
        // for this we'll need body-parser:

    });


}

module.exports router;