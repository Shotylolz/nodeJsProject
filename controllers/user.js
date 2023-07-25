const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require ('../models/user');

exports.signup = (req, res, next) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
            const user = new User({
                email : req.body.email,
                password : hash
            });
            //console.log(user);
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
            .catch(error => res.status(400).json( {error} ));
            })
        } else {
            res.status(401).json({message: 'Cette adresse mail est déjà utilisé'})
        }
    })
    .catch(error => res.status(500).json( {error} ));
};

exports.login = (req, res, nex) => {
    User.findOne({ email : req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json( { message : 'erreur dans les identifiants de connexion'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ message : 'erreur dans les identifiants de connexion'});
            }
            res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json( {error}));
    })
    .catch(error => res.status(500).json({ error }));
}