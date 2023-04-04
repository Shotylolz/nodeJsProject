const Book = require ('../models/book');

const url = require('url');



exports.getAllBooks = (req, res, next) => {
    //console.log("getAllBook");
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))

    getBestRating();
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({_id : req.params.id})
    .then(books => {
        if(!books){
            return res.status(400).json( { message : 'Ce livre n\'existe pas'});
        }
        res.status(200).json(books)
    })
    .catch(error => res.status(500).json({error}))
}

function getBestRating() {
    Book.find().sort({averageRating:-1}).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))
}
