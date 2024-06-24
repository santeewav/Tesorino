var map = L.map('map', {attributionControl: false}).setView([43.5462, 11.1400], 7);
        var myAttrControl = L.control.attribution().addTo(map);
        myAttrControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');

        var Stadia_StamenTerrainLabels = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        });

        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Data by &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, under <a href="https://opendatacommons.org/licenses/odbl/">ODbL.</a>'
        }).addTo(map);

        var bottleIcon = L.icon({
            iconUrl: './assets/bottleIcon.png',
            shadowUrl: './assets/bottleIconShadow.png',
            iconSize: [25, 70],
            shadowSize: [30, 40],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        });

        var originalData = [];

        fetch('./docs/dati.json')
            .then(response => response.json())
            .then(data => {
                originalData = data;
                processAndDisplayData(data);
            })
            .catch(error => {
                console.error('Errore durante il caricamento del file JSON:', error);
            });

        function processAndDisplayData(data) {
            var markers = [];
            for (let i = 0; i < data.length; i++) {
                const foglio = data[i];
                const nomeFoglio = foglio.nomeFoglio;
                const dati = foglio.dati;

                for (let j = 0; j < dati.length; j++) {
                    const elemento = dati[j];
                    if (elemento[5] != null && elemento[3].trim() !== '') {
                        const coordinate = elemento[5].split(',').map(coord => parseFloat(coord.trim()));
                        const latitudine = coordinate[0];
                        const longitudine = coordinate[1];

                        if (!isNaN(latitudine) && !isNaN(longitudine)) {
                            markers.push({
                                type: 'Feature',
                                properties: {
                                    popupContent: elemento[0] + ' ' + elemento[1] + ' ' + elemento[2] + ' ' + elemento[3] + ' ' + elemento[4],
                                    city: elemento[1],
                                    province: elemento[2],
                                    country: elemento[4]
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: [longitudine, latitudine],
                                }
                            });
                        } else {
                            console.error('Errore: coordinate non valide per l\'elemento ' + j);
                        }
                    } else {
                        console.error('Errore: coordinate mancanti per l\'elemento ' + j);
                    }
                }
            }

            var index = new Supercluster({
                radius: 40,
                maxZoom: 60
            }).load(markers);

            var currentMarkers = [];

            function updateMarkers() {
                currentMarkers.forEach(marker => map.removeLayer(marker));
                currentMarkers = [];

                var bounds = map.getBounds();
                var zoom = map.getZoom();
                var clusters = index.getClusters([
                    bounds.getWest(),
                    bounds.getSouth(),
                    bounds.getEast(),
                    bounds.getNorth()
                ], zoom);

                clusters.forEach(cluster => {
                    var [longitude, latitude] = cluster.geometry.coordinates;
                    if (cluster.properties.cluster) {
                        var clusterMarker = L.marker([latitude, longitude], {
                            icon: L.divIcon({
                                html: `<div class="marker-cluster">${cluster.properties.point_count_abbreviated}</div>`,
                                className: 'marker-cluster',
                                iconSize: [30, 30]
                            })
                        }).addTo(map);
                        currentMarkers.push(clusterMarker);
                    } else {
                        var marker = L.marker([latitude, longitude], { icon: bottleIcon })
                            .bindPopup(cluster.properties.popupContent)
                            .addTo(map);
                        currentMarkers.push(marker);
                    }
                });
            }

            map.on('moveend', updateMarkers);
            updateMarkers();
        }

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
        