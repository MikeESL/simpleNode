const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const sql = require('mssql');

function router(nav) {
    // const books is hard coded data, leaving in commentas example, move to sql or mongo db below it
    // const books = [
    //     {
    //         title: "Wise Blood",
    //         author: "Flannery O'Connor"
    //     },
    //     {
    //         title: "The Unbearable Lightness of Being",
    //         author: "Milan Kundera"
    //     },
    //     {
    //         title: "Slaughterhouse Five",
    //         author: "Kurt Vonnegut"
    //     },
    //     {
    //         title: "The Song is You",
    //         author: "Arthur Phillips"
    //     }   
    //   ];

    bookRouter.route('/').get((req, resp) => {
        // here's how it would look using the promise:
        // const request = new sql.Request();
        // request.query('select * from books')
        //     .then((result) => {
        //         debug(result);
        //         resp.render('books', 
        //     {
        //         nav,
        //         title:'MyNodeApp-Library',
        //         books: result.recordset
        //     });
        // });
        // but we don't want to use a promise, let's use async
        (async function query() {
            const request = new sql.Request();
            const result = await request.query('select * from books');
            debug(result);
            resp.render(
                'books', {
                    nav,
                    title: 'MyNodeApp-Library',
                    books: result.recordset
                });
        }())
    });

    bookRouter.route('/:id').get((req, resp) => {
        (async function query() {
            const id = req.params.id;
            const request = new sql.Request();
            // would have been something like this:
            //const result = await request.query('select title, author from books where id ==' + id);
            // but now (pass in name, type and value):
            const result = await request.input('id', sql.Int, id)
                .query('select * from books where id = @id');
            debug(result);
            resp.render('singleBook',
                {
                    nav,
                    title: 'Just one book',
                    book: result.recordset[0]
                });

        }())

    });
    return bookRouter;
}

module.exports = router;