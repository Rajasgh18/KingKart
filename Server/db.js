const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectToMonogo = () => {
    // mongoose.set('strictQuery', true);
    mongoose.set('strictPopulate', false);
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: "true", useUnifiedTopology: "true" });
    const db = mongoose.connection;
    db.on('connected', ()=>{console.log("MongoDB is Connected!")});
    db.on('error', (err)=>{err});
}

module.exports = connectToMonogo;