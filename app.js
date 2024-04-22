const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views'); // Imposta la cartella delle viste

app.use(express.static(__dirname + '/public'));

// Route per la homepage
app.get('/', (req, res) => {
    res.render('index');
});

// Route per la pagina "Storia"
app.get('/storia', (req, res) => {
    res.render('storia');
});

// Route per la pagina di contatto
app.get('/acqua', (req, res) => {
    res.render('acqua');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/contatti', (req, res) => {
    res.render('contatti');
});

app.get('/home2', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
