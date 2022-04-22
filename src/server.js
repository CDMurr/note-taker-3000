const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const app = express();

const notesData = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

 

app.get('/api/notes', (req, res) => res.json(notesData));
app.post('/api/notes', (req, res) => {
    req.body.id = notesData.length
    const newNote = req.body 
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesData))
    res.json(newNote)
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});