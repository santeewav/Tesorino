document.addEventListener('DOMContentLoaded', () => {



const articles = document.querySelectorAll('.article-content, .ArticlesTitles .col')

    // Seleziona tutti gli elementi con la classe 'crescita' all'interno di '.third .col
const crescita = document.querySelectorAll('.ArticlesTitles .crescita');
// Seleziona tutti gli elementi con la classe 'crescita' all'interno di '.third .articles'
const crescitaCont = document.querySelectorAll('.third .articles .crescita');

// Itera attraverso ogni elemento 'crescita' e aggiungi un event listener
crescita.forEach((crescitaItem, index) => {
    crescitaItem.addEventListener('click', () => {
        // Rimuovi la classe 'active' da tutti gli elementi 'crescitaCont'
        articles.forEach(col => col.classList.remove('active'));
        

        // Aggiungi la classe 'active' all'elemento 'crescitaCont' corrispondente
        if (!crescitaCont[index].classList.contains('active')) {
            crescitaCont[index].classList.add('active');
            crescita[index].classList.add('active');
        }
    });
});
const sport = document.querySelectorAll('.ArticlesTitles .sport');
// Seleziona tutti gli elementi con la classe 'crescita' all'interno di '.third .articles'
const sportCont = document.querySelectorAll('.third .articles .sport');

// Itera attraverso ogni elemento 'crescita' e aggiungi un event listener
sport.forEach((sportItem, index) => {
    sportItem.addEventListener('click', () => {
        // Rimuovi la classe 'active' da tutti gli elementi 'crescitaCont'
        articles.forEach(col => col.classList.remove('active'));

        // Aggiungi la classe 'active' all'elemento 'crescitaCont' corrispondente
        if (!sportCont[index].classList.contains('active')) {
            sportCont[index].classList.add('active');
            sport[index].classList.add('active');
        }
    });
});

const sorsi = document.querySelectorAll('.ArticlesTitles .sorsi');
// Seleziona tutti gli elementi con la classe 'crescita' all'interno di '.third .articles'
const sorsiCont = document.querySelectorAll('.third .articles .sorsi');

// Itera attraverso ogni elemento 'crescita' e aggiungi un event listener
sorsi.forEach((sorsiItem, index) => {
    sorsiItem.addEventListener('click', () => {
        // Rimuovi la classe 'active' da tutti gli elementi 'crescitaCont'
        articles.forEach(col => col.classList.remove('active'));

        // Aggiungi la classe 'active' all'elemento 'crescitaCont' corrispondente
        if (!sorsiCont[index].classList.contains('active')) {
            sorsiCont[index].classList.add('active');
            sorsi[index].classList.add('active');
        }
    });
});

const fonte = document.querySelectorAll('.ArticlesTitles .fonte');
// Seleziona tutti gli elementi con la classe 'crescita' all'interno di '.third .articles'
const fonteCont = document.querySelectorAll('.third .articles .fonte');

// Itera attraverso ogni elemento 'crescita' e aggiungi un event listener
fonte.forEach((fonteItem, index) => {
    fonteItem.addEventListener('click', () => {
        // Rimuovi la classe 'active' da tutti gli elementi 'crescitaCont'
        articles.forEach(col => col.classList.remove('active'));

        // Aggiungi la classe 'active' all'elemento 'crescitaCont' corrispondente
        if (!fonteCont[index].classList.contains('active')) {
            fonteCont[index].classList.add('active');
            fonte[index].classList.add('active');
        }
    });
});



    gsap.registerPlugin(ScrollTrigger);

      gsap.to('#background-video', {
        scrollTrigger: {
            trigger: '.title',
            start: 'top top',
            end: 'center top',
            scrub: true
        },
      transform: 'scale(1.2)'

      });
      gsap.to('#background-video', {
        scrollTrigger: {
            trigger: '.second',
            start: 'top top',
            end: 'center top',
            scrub: true
        },

        translateY: '10vh',
      });
      
      });

