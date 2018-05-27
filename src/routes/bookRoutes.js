const express = require('express');

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
resp.render('books', {
nav:[{"link":"/books",
"title":"Books"},
{"link":"/authors",
"title": "Authors"}], 
title:'MyNodeApp-Library',
books
});
});
bookRouter.route('/single').get((req, resp) => {
resp.send('single books bitch');
})
app.use('/books', bookRouter);