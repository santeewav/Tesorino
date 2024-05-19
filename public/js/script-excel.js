var XLSX = require('xlsx');

function leggiFileExcel() {
    var workbook = XLSX.readFile("./public/docs/TESORINO-PUNTI-VENDITA.xlsx");
    
      // Array per memorizzare i dati di ogni foglio
      const datiFogli = [];
    
      // Per ogni foglio nel workbook
      workbook.SheetNames.forEach((nomeFoglio) => {
        // Ottieni il foglio corrente
        const foglio = workbook.Sheets[nomeFoglio];
    
        // Converti il foglio in un array di oggetti
        const datiFoglio = XLSX.utils.sheet_to_json(foglio, { header: 1 });
    
        // Verifica se le prime 4 colonne non sono vuote per ogni riga
        const datiFoglioFiltrati = datiFoglio.filter((riga) => {
          // Verifica se le prime 4 colonne non sono tutte vuote
          return riga.slice(0, 4).some((val) => val !== '');
        });
    
        // Aggiungi i dati del foglio filtrato all'array datiFogli solo se non è vuoto
        if (datiFoglioFiltrati.length > 0) {
          datiFogli.push({
            nomeFoglio: nomeFoglio,
            dati: datiFoglioFiltrati
          });
        }
      });
    
      return datiFogli;
    }
    
    // Esegui la funzione per leggere il file Excel e ottenere gli array per ogni riga di ogni foglio
    const arrayFogli = leggiFileExcel();
    
    // Stampa gli array risultanti
    // console.log(arrayFogli);
    
const fs = require('fs');

// Dopo aver generato gli arrayFogli
fs.writeFileSync('./public/docs/dati.json', JSON.stringify(arrayFogli));
