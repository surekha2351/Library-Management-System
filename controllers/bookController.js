const Book = require('../models/Book');

const addBook = async (req, res, next) => {
    try {
        const { title, author, isbn, category, quantity } = req.body;
        const bookExists = await Book.findOne({ isbn });
        if (bookExists) return res.status(400).json({ success: false, message: 'Book with this ISBN already exists' });

        const book = await Book.create({ title, author, isbn, category, quantity, availableQuantity: quantity });
        res.status(201).json({ success: true, data: book });
    } catch (error) { next(error); }
};

const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.json({ success: true, data: books });
    } catch (error) { next(error); }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, data: book });
    } catch (error) { next(error); }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, data: book });
    } catch (error) { next(error); }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book removed' });
    } catch (error) { next(error); }
};

module.exports = { addBook, getBooks, getBookById, updateBook, deleteBook };