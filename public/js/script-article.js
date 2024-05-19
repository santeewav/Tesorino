fetch('/news/News.json')
.then(response => response.json())
.then(data => {

  // Itera sugli oggetti nell'array
  for (let i = 0; i < data.length; i++) {
        const dato = data[i]
        const title = document.createElement("h3");
        const nodeh = document.createTextNode(dato.titolo);
        title.appendChild(nodeh);

        const maxLength = 100; // Lunghezza massima desiderata
        const artText = dato.contenuto.length > maxLength ? dato.contenuto.slice(0, maxLength) + '...' : data.contenuto;
        // Crea un elemento <p>
        const para = document.createElement("p");
        // Crea un nodo di testo con il testo limitato
        const nodep = document.createTextNode(artText);
        para.appendChild(nodep);

        var basePath = "/news/";
        var dynamicPath = dato.immagine;

        var image = document.createElement("img");
        image.src = basePath + dynamicPath;

        var textParent = document.getElementById("newsContainer");
        var notizia = document.createElement("div")
        notizia.className = "notizia";
        textParent.appendChild(notizia);

        var info = document.createElement("div")
        info.className = "info";
        notizia.appendChild(info);

        info.appendChild(image);

        var text = document.createElement ("div");
        text.className = "testo";
        info.appendChild(text);

        text.appendChild(title);
        text.appendChild(para);




                  
    }

})
.catch(error => {
  console.error('Errore durante il caricamento del file JSON:', error);
});
