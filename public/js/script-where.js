var map = L.map('map').setView([43.5462,11.1400], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var bottleIcon = L.icon({
    iconUrl: './assets/bottleIcon.png',
    shadowUrl: './assets/bottleIconShadow.png',

    iconSize:     [25, 70], // size of the icon
    shadowSize:   [30, 40], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

fetch('./docs/dati.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Dati caricati dal file JSON (array di array)

    // Itera sugli oggetti nell'array
    for (let i = 0; i < data.length; i++) {
        const foglio = data[i];
        const nomeFoglio = foglio.nomeFoglio;
        const dati = foglio.dati;
  
        console.log(`Nome foglio: ${nomeFoglio}`);
        
        // Itera sull'array dati del foglio corrente
        for (let j = 0; j < dati.length; j++) {
          const elemento = dati[j];
        
                    // Verifica se elemento[3] non è null e non è una stringa vuota
            if (elemento[3] != null && elemento[3].trim() !== '') {
                // Suddividi la stringa delle coordinate in latitudine e longitudine
                const coordinate = elemento[3].split(',').map(coord => parseFloat(coord.trim()));
                const latitudine = coordinate[0]; // latitudine
                const longitudine = coordinate[1]; // longitudine

                // Verifica se latitudine e longitudine sono validi
                if (!isNaN(latitudine) && !isNaN(longitudine)) {
                // Crea un marker Leaflet e aggiungilo alla mappa
                const marker = L.marker([latitudine, longitudine],{icon: bottleIcon}).addTo(map)
                    .bindPopup(elemento[0] + ' ' + elemento[1] + ' ' + elemento[2])
                    .openPopup();
                } else {
                console.error('Errore: coordinate non valide per l\'elemento ' + j);
                }
            } else {
                console.error('Errore: coordinate mancanti per l\'elemento ' + j);
            }
                    
        }
      }

  })
  .catch(error => {
    console.error('Errore durante il caricamento del file JSON:', error);
  });