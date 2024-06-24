let data = [];
let negozi = [];

// Funzione per caricare i dati JSON e inizializzare le dropdown
function caricaDati() {
    fetch('./docs/citta.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;

            // Ordina le province in ordine alfabetico
            data.sort((a, b) => a.provincia.localeCompare(b.provincia));

            const provinciaSelect = document.getElementById('provincia');
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.provincia;
                option.textContent = item.provincia;
                provinciaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
    
    fetch('./docs/dati.json') // Assuming you will create this file based on the provided data
        .then(response => response.json())
        .then(jsonData => {
            negozi = jsonData;
        })
        .catch(error => console.error('Errore nel caricamento del JSON dei negozi:', error));
}

// Funzione per aggiornare la dropdown delle città in base alla provincia selezionata
function aggiornaCitta() {
    const provinciaSelect = document.getElementById('provincia');
    const cittaSelect = document.getElementById('citta');
    const provincia = provinciaSelect.value;

    console.log('Provincia selezionata:', provincia);

    // Pulisce le opzioni precedenti della lista delle città
    cittaSelect.innerHTML = '<option value="">Seleziona una città</option>';

    // Trova i dati della provincia selezionata
    const provinciaDati = data.find(item => item.provincia === provincia);
    console.log('Dati della provincia:', provinciaDati);
    
    if (provinciaDati && provinciaDati.citta) {
        // Rimuove i duplicati, filtra le città indesiderate e ordina le città in ordine alfabetico
        const cittaUniche = [...new Set(provinciaDati.citta.filter(citta => citta !== "CITTA'"))];
        cittaUniche.sort((a, b) => a.localeCompare(b));
        cittaUniche.forEach(citta => {
            const option = document.createElement('option');
            option.value = citta;
            option.textContent = citta;
            cittaSelect.appendChild(option);
        });
    } else {
        console.warn('Nessuna città trovata per la provincia selezionata:', provincia);
    }
}

// Funzione per mostrare i negozi in base alla città selezionata
function mostraNegozi() {
    const provinciaSelect = document.getElementById('provincia');
    const cittaSelect = document.getElementById('citta');
    const provincia = provinciaSelect.value;
    const citta = cittaSelect.value;
    const negoziContainer = document.getElementById('negozi');
    const nomeCitta = document.getElementById('nome-citta');
    const listaNegozi = document.getElementById('lista-negozi');

    console.log('Provincia selezionata:', provincia);
    console.log('Città selezionata:', citta);

    // Pulisce la lista dei negozi precedente
    listaNegozi.innerHTML = '';

    // Trova i dati dei negozi per la provincia selezionata
    const negoziProvincia = negozi.find(item => item.nomeFoglio === provincia);
    console.log('Negozi della provincia:', negoziProvincia);
    
    if (negoziProvincia && negoziProvincia.dati) {
        negoziProvincia.dati.forEach(negozio => {
            if (negozio[1] === citta && negozio[1] !== "CITTA'") {
                const li = document.createElement('li');

                const h3 = document.createElement('h3');
                h3.textContent = negozio[0];
                
                li.dataset.coordinates = negozio[5]; // Salva le coordinate nel dataset
                li.addEventListener('click', function() {
                    const coordinates = this.dataset.coordinates.split(',').map(coord => parseFloat(coord.trim()));
                    map.setView(coordinates, 15); // Imposta la vista della mappa sulle coordinate con uno zoom di 15
                });

                li.appendChild(h3);
                li.appendChild(document.createTextNode(` - ${negozio[3]} - ${negozio[2]}`));
                
                listaNegozi.appendChild(li);
            }
        });

        nomeCitta.textContent = citta;
        negoziContainer.style.display = 'block';
    } else {
        console.warn('Nessun negozio trovato per la città selezionata:', citta);
        negoziContainer.style.display = 'none';
    }
}

// Carica i dati JSON all'avvio della pagina
document.addEventListener('DOMContentLoaded', caricaDati);

// Aggiungi un listener per l'evento di cambio del dropdown delle province
document.getElementById('provincia').addEventListener('change', aggiornaCitta);

// Aggiungi un listener per l'evento di cambio del dropdown delle città
document.getElementById('citta').addEventListener('change', mostraNegozi);
