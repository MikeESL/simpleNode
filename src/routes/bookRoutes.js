const express = require('express');
const bookRouter = express.Router();

function router(nav) {
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

bookRouter.route('/').get((req, resp) => {
    resp.render('books', 
    {
        nav,
        title:'MyNodeApp-Library',
        books
    });
});

bookRouter.route('/:id').get((req, resp) => {
    const id = req.params.id;
    resp.render('singleBook', 
        { 
            nav,
            title:'MyNodeApp-Library',
            book: books[id]
        });
});
 return bookRouter;
}

module.exports = router;