const express = require ('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const multerTwo = require('multer');


const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating/bestbook', bookCtrl.getBestRated);
router.post('/', auth, multer, bookCtrl.AddNewBook);
router.post('/:id/rating', auth, multer, bookCtrl.updateRatingBook);
router.put('/:id', auth, multer, bookCtrl.modifyOneBook);
router.delete('/:id', auth, multer, bookCtrl.deleteBook);


module.exports = router;