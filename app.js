const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path')



const app = express();

const jsonData = fs.readFileSync('./public/news/News.json');
const dati = JSON.parse(jsonData);

app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/@splinetool/runtime', express.static(path.join(__dirname, 'node_modules', '@splinetool', 'runtime')));



app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));



app.set('view engine', 'ejs');
app.set('views', './views'); // Imposta la cartella delle viste

const template = fs.readFileSync('./views/article.ejs', 'utf8');

// Itera attraverso i dati delle news e genera una pagina HTML per ciascuna news
dati.forEach((news, index) => {
    // Genera il markup HTML utilizzando il template EJS e i dati delle news
    const paginaHTML = ejs.render(template, { news: news });

    // Scrivi il markup HTML in un nuovo file
    fs.writeFileSync(`./views/news_${index}.ejs`, paginaHTML, 'utf8');
});

console.log('Generazione delle pagine HTML completata.');
app.use(express.static(__dirname + '/public'));

// Route ;per la homepage
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
    const { exec } = require('child_process');
  exec('node ./public/js/script-newsData.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Errore durante l'esecuzione dello script: ${err}`);
      return;
    }
    console.log(`Script eseguito con successo: ${stdout}`);
    return
  });

    res.render('news');
});

app.get('/article', (req, res) => {
    res.render('article');
});

app.get('/dove', (req, res) => {
    const { exec } = require('child_process');
  exec('node ./public/js/script-excel.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Errore durante l'esecuzione dello script: ${err}`);
      return;
    }
    console.log(`Script eseguito con successo: ${stdout}`);
    return
  });
  
  
  // Invia la risposta al client (puoi inviare la pagina HTML o reindirizzare a un'altra pagina)
    res.render('where');
});

app.get('/news/sponsorizzazioni', (req, res) => {
    const { exec } = require('child_process');
  exec('node ./public/js/script-newsData.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Errore durante l'esecuzione dello script: ${err}`);
      return;
    }
    console.log(`Script eseguito con successo: ${stdout}`);
    return
  });
  res.render('sponsorizzazioni');
});

app.get('/:page', (req, res) => {
  const page = req.params.page;

  // Verifica se il file di template per la pagina richiesta esiste
  fs.access(`./views/${page}.ejs`, fs.constants.F_OK, (err) => {
      if (err) {
          // Se il file non esiste, invia un errore 404
          res.status(404).render('404');
          return;
      }

      // Se il file esiste, renderizza la pagina richiesta
      res.render(page);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
