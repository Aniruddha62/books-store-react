const express = require('express');
const Book = require('./Book');
const app = express();
const port = 3000;

app.use(express.json());

//Get() Definition
app.get('/books', (req, res) => {res.send(Book.findAll());
});

//Get(id) Definition
app.get('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    const book = Book.findOne(bookId);

    if(!book) {
        res.send(404, {
            message: 'Could not find the book'
        });
        return;
    }
    res.send(book);
});

//Post() Definition
app.post('/books', (req, res) => {
    res.send(Book.create(req.body));
});

//Put() Definition
app.put('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId, 10);
    res.send(Book.update(bookId, req.body));
});

//Delete() Definition
app.delete('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = Book.findOne(bookId);

    if(!book) {
        return res.status(404).send({
            message: 'The book you want to delete doesnot exist'
        });
    }
    
    const destroyedBookId = Book.destroy(bookId);
    if(destroyedBookId !== null) {
        return res.sendStatus(204);
    }

    res.status(500).send({
        message: 'Could not delete the book'
    });
});

app.listen(port, () => {
    console.log(`Express server is currently listening on port ${port}`);
});