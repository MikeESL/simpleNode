const express = require('express');
const debug = require('debug')('app:adminRoutes');
const mongoClient = require('mongodb').MongoClient
const adminRouter = express.Router();


function router (nav) {
    const books = [
        {
            title: "Wise Blood",
            author: "Flannery O'Connor"
        },
        {
            title: "The Unbearable Lightness of Being",
            author: "Milan Kundera"
        },
        {
            title: "Slaughterhouse Five",
            author: "Kurt Vonnegut"
        },
        {
            title: "The Song is You",
            author: "Arthur Phillips"
        }   
      ];
    adminRouter.route('/')
        .get((req, res) => {
        // all our db stuff right in here:
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        // just like with mySQL, we could use promises, but . . .
        // . .  let's use async await. (1) create an IFFE
        (async function mongo(){
            let client;
            try{
                client = await mongoClient.connect(url);
                debug("connected correctly!")
                const db = client.db(dbName);

                const bigResp = await db.collection('books').insertMany(books);
                res.json(bigResp);
            } catch (err) {
                debug(err.stack);
            }
        client.close();
        }()) // end IFFE
    });
    return adminRouter;
}

module.exports = router; 