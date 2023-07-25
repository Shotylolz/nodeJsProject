const multer = require('multer');
const SharpMulter = require('sharp-multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage =  SharpMulter ({
              destination:(req, file, callback) =>callback(null, "images"),
              imageOptions:{
               fileFormat: "jpg",
               quality: 80,
               resize: { width: 500, height: 500 },
                 },
                 filename: (filename) => {
                    const name = filename.split(' ').join('_');
                    return Date.now() + name;
                    //const name = file.originalname.split(' ').join('_');
                    //const extension = MIME_TYPES[file.mimetype];
                    //callback(null,Date.now()+ name);
                }
           });

/*
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    
});
*/

module.exports = multer({storage: storage}).single('image');
