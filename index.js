// list of requires
const express = require('express');
const chalk = require('chalk');
const debug = require ('debug')('app');
const morgan = require('morgan');
// for sql setup, likely change to mongo later, but keep this in comments:
const sql = require('mssql');
    // path to make sendFile paths easy, no npm needed; already here
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
// mssql config:
const config = {
    user: 'mikereser',
    password: 'Nodelibrary123',
    server: 'nodelibraryreser.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'nodeLibrary',
    options: {
        encrypt: true
    }
}
// SQL connection; returns a promise, if needed:
sql.connect(config).catch(err => debug(err));

// for  middleware: //look into other options besides combined, like tiny, etc
app.use(morgan('tiny'));

// tells express, 'hey, i'm setting up a static dir (like for css/js libs)
app.use(express.static(path.join(__dirname, '/public')));

// first, look in public, if not there, start looking down here:
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.set('views', './src/views');
// app.set('view engine', 'pug');
// change pug to ejs:
app.set('view engine', 'ejs');

// on nav for entire app:
const nav = [
    {"link":"/books",
     "title":"Books"},
    {"link":"/authors",
     "title": "Authors"}
    ]

//Router code will go here, const to define, followed by uses:
const bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/books', bookRouter);

// request to this route exe this function:
app.get('/', (req, resp) => {
//resp.send('<p><strong>hell world</strong></p>');
//change to sendFile:
 //   resp.sendFile(path.join(__dirname, '/views/index.html'));
// above is to send html, here, is render a pug file:
    resp.render('index', {
        nav:[{"link":"/books",
              "title":"Books"},
             {"link":"/authors",
             "title": "Authors"}], 
        title:'MyNodeApp-Library'
    });
});

app.listen(3000, function(){
/* like this:
console.log("listening on port " + chalk.green('3000'));
 change to template string:
 console.log(`listening on port ${chalk.green('3000')}`);
 but no more console logs: npm install debug instead
 only runs in debug mode
 to run, in terminal, DEBUG=* node index.js OR DEBUG=myApp node index.js
 comd above changed to nodemon with it's install
 */
  debug(`listening on port ${chalk.green(port)}`);
});
