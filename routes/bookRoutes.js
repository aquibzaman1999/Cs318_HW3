const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');

// Get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one book
router.get('/books/:id', getBook, (req, res) => {
    res.json(res.book);
});

// Create a book
router.post('/books', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a book
router.patch('/books/:id', getBook, async (req, res) => {
    if (req.body.name != null) {
        res.book.name = req.body.name;
    }
    if (req.body.price != null) {
        res.book.price = req.body.price;
    }
    if (req.body.description != null) {
        res.book.description = req.body.description;
    }
    if (req.body.rating != null) {
        res.book.rating = req.body.rating;
    }

    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book
router.delete('/books/:id', getBook, async (req, res) => {
    try {
        await res.book.remove();
        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}

module.exports = router;
