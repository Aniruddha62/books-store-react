const res = require("express/lib/response");

//Sample Database
let books = [
    {
        "id": 1,
        "title": "Harry Potter"
    },
    {
        "id": 2,
        "title": "The Giving Tree"
    },
    {
        "id": 3,
        "title": "The Da Vinci Code"
    },
    {
        "id": 4,
        "title": "Life of Pi"
    }
];

let lastId =4;

module.exports = {
    
    //Display all the books.
    findAll() {
        return books;
    },

    //Display one book on search by id.
    findOne(id) {
        return books.find(book => book.id === id);
    },

    //Add one book to the sample database array of object.
    create(book) {
        const id = ++lastId;
        const newBook = {
            id,
            title: book.title
        };
        books.push(newBook);
        return newBook;
    },

    //Update one book on search by id.
    update(id, book) {
        const existingBook = books.find(book => book.id === id);

        if(!existingBook) {
            return null;
        }

        const updatedBook = {
            ...existingBook,
            ...book
        };
        books = books.map(book => {
            if(book.id === id) {
                return updatedBook;
            }
            return book;
        });
        return updatedBook;
    },

    //Delete one book on search by id.
    destroy(id) {
        books = books.filter(book => book.id !== id);
        return id;
    }
};