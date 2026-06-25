const User = require('../models/User');
const Book = require('../models/Book');
const Borrow = require('../models/Borrow');

const getMembers = async (req, res, next) => {
    try {
        const members = await User.find({ role: 'member' }).select('-password');
        res.json({ success: true, data: members });
    } catch (error) { next(error); }
};

const deleteMember = async (req, res, next) => {
    try {
        const member = await User.findByIdAndDelete(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
        res.json({ success: true, message: 'Member removed' });
    } catch (error) { next(error); }
};

const borrowBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const memberId = req.user._id;

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
        if (book.availableQuantity <= 0) return res.status(400).json({ success: false, message: 'Book is currently unavailable' });

        const alreadyBorrowed = await Borrow.findOne({ memberId, bookId, status: 'borrowed' });
        if (alreadyBorrowed) return res.status(400).json({ success: false, message: 'You have already borrowed this book' });

        await Borrow.create({ memberId, bookId });
        book.availableQuantity -= 1;
        await book.save();

        res.status(200).json({ success: true, message: 'Book borrowed successfully' });
    } catch (error) { next(error); }
};

const returnBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const memberId = req.user._id;

        const borrowRecord = await Borrow.findOne({ memberId, bookId, status: 'borrowed' });
        if (!borrowRecord) return res.status(400).json({ success: false, message: 'You have not borrowed this book or it is already returned' });

        borrowRecord.status = 'returned';
        borrowRecord.returnDate = Date.now();
        await borrowRecord.save();

        const book = await Book.findById(bookId);
        book.availableQuantity += 1;
        await book.save();

        res.status(200).json({ success: true, message: 'Book returned successfully' });
    } catch (error) { next(error); }
};

const getMyBorrowedBooks = async (req, res, next) => {
    try {
        const records = await Borrow.find({ memberId: req.user._id, status: 'borrowed' }).populate('bookId');
        res.json({ success: true, data: records });
    } catch (error) { next(error); }
};

module.exports = { getMembers, deleteMember, borrowBook, returnBook, getMyBorrowedBooks };