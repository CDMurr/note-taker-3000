const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// i thought this would allow to Get notes.html?
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './notes'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});