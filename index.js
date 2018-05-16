// list of requires
var express = require('express'),
    chalk = require('chalk'),
    debug = require ('debug')('myApp'),
    morgan = require('morgan');


//app:
var app = express();
 



// for  middleware: //look into other options besides combined, like tiny, etc
app.use(morgan('tiny'));

// request to this route exe this function:
app.get('/', function(req, resp){
    resp.send('<p><strong>hell world</strong></p>');
})

app.listen(3000, function(){
    // like this:
    //console.log("listening on port " + chalk.green('3000'));
    // change to template string:
   // console.log(`listening on port ${chalk.green('3000')}`);
   // but no more console logs: npm install debug instead
   // only runs in debug mode 
   // to run, in terminal, DEBUG=* node index.js OR DEBUG=myApp node index.js
   debug(`listening on port ${chalk.green('3000')}`);


    
    
});
 