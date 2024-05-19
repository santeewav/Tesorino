const XLSX = require('xlsx');

function leggiFileExcel() {
    const workbook = XLSX.readFile("./public/news/Tesorino-News.xlsx");

    const news = [];

    workbook.SheetNames.forEach((nomeFoglio) => {
        const foglio = workbook.Sheets[nomeFoglio];
        const datiFoglio = XLSX.utils.sheet_to_json(foglio, { header: 1 });

        datiFoglio.forEach((riga) => {
            // Assicurati che ci siano almeno tre colonne di dati
            if (riga.length >= 3) {
                const newsItem = {
                    titolo: riga[0], // Prima colonna: titolo
                    immagine: riga[1], // Seconda colonna: nome immagine
                    contenuto: riga[2] // Terza colonna: contenuto
                };

                // Aggiungi l'oggetto newsItem all'array news
                news.push(newsItem);
            }
        });
    });

    return news;
}

// Esegui la funzione per leggere il file Excel e ottenere gli oggetti news
const news = leggiFileExcel();

// Scrivi l'array di oggetti JSON nel file JSON
const fs = require('fs');
fs.writeFileSync('./public/news/News.json', JSON.stringify(news, null, 2));
