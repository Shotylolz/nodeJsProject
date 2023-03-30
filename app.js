const express = require("express");

const mongoose = require('mongoose');

const app = express();

const Book = require('./models/book');

const User = require('./models/user');

const data = require("../frontend/public/data/data.json");


/*
const user = new User({
  id : 8,
  emailAdress : "vincent.quildfes@hotmail.fr",
  password : "projetNodeTwo"
});

user.save();

const book = new Book({
  id: "1",
  userId : "clc4wj5lh3gyi0ak4eq4n8syr",
  title : "Milwaukee Mission",
  author: "Elder Cooper",
  imageUrl : "https://via.placeholder.com/206x260",
  year : 2022,
  genre : "Policier",
  ratings : [{
    userId : "1",
    grade: 5
  },
    {
      userId : "1",
      grade: 5
    },
    {
      userId : "clc4wj5lh3gyi0ak4eq4n8syr",
      grade: 5
    },
    {
      userId : "1",
      grade: 5
    }],
  averageRating: 3

})

book.save();
*/



mongoose.connect('mongodb+srv://Vincent:projetNode@projetnode.hmluiyg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());










app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/api/books', (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}))
  });

module.exports = app;