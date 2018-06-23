const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter  = express.Router();
function router () {
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
                // insert
            } catch (err) {

            }

        }())
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