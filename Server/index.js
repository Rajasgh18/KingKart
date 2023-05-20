const express = require('express');
const App = express();
const port = 5000;

App.get("/", (req, res)=>{
    res.send("Hello World");
})

App.listen(port, ()=>{
    console.log(`KingKart Listening at http://localhost:${port}`)
})