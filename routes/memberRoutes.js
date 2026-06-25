const express = require('express');
const { getMembers, deleteMember, getMyBorrowedBooks } = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, authorize('librarian'), getMembers);

router.route('/:id')
    .delete(protect, authorize('librarian'), deleteMember);

router.get('/me/books', protect, authorize('member'), getMyBorrowedBooks);

module.exports = router;