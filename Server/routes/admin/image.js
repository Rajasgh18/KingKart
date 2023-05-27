const Router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, image, cb) => {
        cb(null, image.originalname)
    }
})
const upload = multer({ storage });

//upload single image
Router.post('/single', upload.single('image'), (req, res) => {
    try {
        res.status(200).send("uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
})

//upload multiple images
Router.post('/multiple', upload.array('images', 5), (req, res) => {
    try {
        res.status(200).send("Successfully stored the images!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = Router;