const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require ('passport');

const authRouter  = express.Router();

function router (nav) {
    authRouter.route('/signUp').post((req, res) => {
        // for this we'll need body-parser:
        const { username, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        ( async function addUser(){
            // first, create client
            let client;
            try {
                client = await MongoClient.connect(url);
                debug("connected!");
                const db = client.db(dbName);
                // create new collection called users:
                const col = db.collection('users');
                // create user:
                const user = {username, password};
                // insert user:
                const results = await col.insertOne(user);
                debug("RESULTS=====>", results);
                    // create user:
                    // login prop of request comes from passport init:
                    req.login(results.ops[0], ()=>{
                        res.redirect('/auth/profile');
                    });
            } catch (err) {
                debug(err);
            }

        }())
        debug(req.body);

        //res.json(req.body);
    });
    authRouter.route('/signin').get((req, res) =>{
        debug("do we even get here?");
        res.render('signin', {
            nav,
            title: 'signIn'
        })
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }))
    authRouter.route('/profile').get((req,res) => {
        debug("trying to figure this out");
        //passport attaches user to req:
        res.json(req.user);
    })
    return authRouter;
}

module.exports = router;