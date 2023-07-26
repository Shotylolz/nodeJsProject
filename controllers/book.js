const Book = require ('../models/book');

const url = require('url');




exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))
}



exports.getOneBook = (req, res, next) => {
    Book.findOne({_id : req.params.id})
    .then(book => {
        if(!book){
            return res.status(400).json( { message : 'Ce livre n\'existe pas'});
        }
        res.status(200).json(book)
    })
    .catch(error => res.status(500).json({error}))
}

exports.getBestRated = (req, res, next) => {
    Book.find().sort({averageRating : -1}).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({error}))
}

exports.updateRatingBook = (req, res, next) => {
    const userId = req.auth.userId;
    let numberTotalStars = 0;
    let numberTotalStarsNewUser = 0;
    Book.findOne({_id: req.params.id})
    .then(book => {
        book.ratings.forEach(e => {
            if(e.userId === userId) {
                res.status(401).json({ error });
            }
        });
        numberTotalStars += parseInt(req.body.rating);
        numberTotalStarsNewUser += parseInt(req.body.rating);
        /**
         *Création d'un objet qui prendra l'id de l'user et la note
         *La note venant du formulaire prenait le nom de "rating", ce qui occasionnait un bug dans la base de donné car enregistré sous le nom de "grade"
         * Pour corriger ce problème, je crée un objet prenant userId pour "userId" et le req.body.rating pour "grade"
        */
        let notationObjectNewUser = {};
        notationObjectNewUser.userId = userId;
        notationObjectNewUser.grade = numberTotalStarsNewUser;
        
        let bookAllRating = book.ratings;
        for(let i = 0; i < bookAllRating.length; i++) {
            numberTotalStars += bookAllRating[i].grade;
        }
        
        const newAvegareRating = numberTotalStars / (book.ratings.length + 1);
        book.averageRating = newAvegareRating;
        book.ratings.push(tabl);
        book.save();
        return res.status(200).json(book);
    })
    
}



exports.AddNewBook = (req, res, next) => {
    let tablAllId;
    let IdForNewBook;
    console.log(req.auth.userId + "fonction book");
    Book.find()
    .then(books => {
        tablAllId = [];
        for(let i = 0; i < books.length ; i++){
            tablAllId.push(parseInt(books[i].id));
        }
        tablAllId.sort((a, b) => a - b);
        IdForNewBook = tablAllId[tablAllId.length - 1];
        IdForNewBook += 1;
        const bookObject = JSON.parse(req.body.book);
        delete bookObject.__id;
        delete bookObject.__userId;
        const book = new Book({
            ...bookObject,
            id: IdForNewBook,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        book.save()
        .then(() => res.status(201).json({ message: 'Livre bien enregistré'}))
        .catch(error => res.status(403).json({error }));
        })
   .catch(error => res.status(403).json({error }))
    
};



exports.modifyOneBook = (req, res, next) => {
    Book.updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => {
        res.status(200).json({ message: `Livre bien enregistré`})
    })
    .catch(error => res.status(400).json({ error }));
}



exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id : req.params.id})
    .then(book => {
        if(!book) {
            return res.status(400).json( {message: 'Il y a une erreur'});
        }
        res.status(200).json(book);
    })
    .catch(error => res.status(500).json({error}))
}

