const express = require('express');
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { borrowBook, returnBook } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { validateBook, validate } = require('../validators/validationRules');
const router = express.Router();

router.route('/')
    .get(protect, getBooks)
    .post(protect, authorize('librarian'), validateBook, validate, addBook);

router.route('/:id')
    .get(protect, getBookById)
    .put(protect, authorize('librarian'), updateBook)
    .delete(protect, authorize('librarian'), deleteBook);

router.post('/:id/borrow', protect, authorize('member'), borrowBook);
router.post('/:id/return', protect, authorize('member'), returnBook);

module.exports = router;