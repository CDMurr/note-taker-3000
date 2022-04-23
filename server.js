const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const app = express();

let notesData = []
const { json } = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data)
        notesData = []
        notesData.push(...notes)
        res.json(notes)
    })

});


app.post('/api/notes', (req, res) => {
    req.body.id = notesData.length
    const newNote = req.body
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesData))
    res.json(newNote)
});

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data)
        console.log(notes, id)
        const newNotes = JSON.stringify(notes.filter((note) => note.id !== id))
        console.log(newNotes)
        fs.writeFile(path.join(__dirname, './db/db.json'), newNotes, (err) => {
            if (err) throw err;

        })
        res.json({
            ok: true
        })
    })

})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});