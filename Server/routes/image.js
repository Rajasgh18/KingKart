const Router = require('express').Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/assets/productImg/');
    },
    filename: (req, image, cb) => {
        cb(null, req.body.fileName)
    }
})
const upload = multer({ storage });

//upload single image
Router.post('/single', upload.single('image'), (req, res) => {
    try {
        res.status(200).send("uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
        console.error(error)
    }
})

//upload multiple images
Router.post('/', upload.array('images', 8), (req, res) => {
    try {
        res.status(200).send("Successfully uploaded the images!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = Router;