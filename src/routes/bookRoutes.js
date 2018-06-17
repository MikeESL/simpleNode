
const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const { MongoClient, ObjectID } = require('mongodb')

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      // just like with mySQL, we could use promises, but . . .
      // . .  let's use async await. (1) create an IFFE
      (async function mongo(){
          let client;
          try {
              client = await MongoClient.connect(url);
              debug("connected correctly via book routes!!")
              const db = client.db(dbName);

              const col = await db.collection('books');
              // select in sql is find in mongo!
              const books = await col.find().toArray();
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
    } catch (err){
      debug(err.stack);
    }
    close.client();
  }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongoOneBook(){
        let client;
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const col = await db.collection('books');
  // ** NOTE! const book = col.findOne({_id:id }) won't work because id isn't a string, it's an object id (use mongo to build it out )
  // ** go back to line 5 (destructured object):
            const book = await col.findOne({_id: new ObjectID(id) });
            debug("1B", book);
            res.render(
              'bookView',
              {
                nav,
                title: 'Library',
                book: book
              }
            );

        } catch (err) {
          debug(err.stack)
        }

      })()

    });
  return bookRouter;
}


module.exports = router;
