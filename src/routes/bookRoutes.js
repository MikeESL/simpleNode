
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
  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });
  return bookRouter;
}


module.exports = router;
