const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter  = express.Router();
function router () {
    authRouter.route('/signUp').post((req, res) => {
        // for this we'll need body-parser:
        debug(req.body);
        // create user:
        // login prop of request comes from passport init:
        req.login(req.body, ()=>{
            res.redirect('/auth/profile');
        });
        //res.json(req.body);
    });
    authRouter.route('/profile').get((req,res) => {
        //passport attaches user to req:
        res.json(req.user);
    })
    return authRouter;
}

module.exports = router;