import * as THREE from 'three'
import { OrbitControls } from '/jsm/controls/OrbitControls.js'
import {GLTFLoader} from '/jsm/loaders/GLTFLoader.js'

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.getElementById('canvas3d');
const renderer = new THREE.WebGLRenderer({antialias: true, debug: true})
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
renderer.setSize(width, height);;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 0); // Imposta uno sfondo nero completamente trasparente

canvas.appendChild( renderer.domElement );



const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luce ambientale
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10, 0);
scene.add(pointLight);


 // Caricamento del modello OBJ della bottiglia
 const loader = new GLTFLoader();
 loader.load(
   './models/bottle/water-bottle.glb', // Percorso del file GLB della bottiglia
  function (gltf) {
    gltf.scene.scale.set(1, 1, 1); 
    
    scene.add(gltf.scene); // Aggiungi il modello alla scena
    
   },
   function (xhr) {
     console.log((xhr.loaded / xhr.total * 100) + '% caricato'); // Progresso del caricamento
   },
   function (error) {
     console.error('Errore nel caricamento del modello della bottiglia', error); // Gestione degli errori
   }
 );
 
 // Posizionamento della camera
 camera.position.z = 5;
 camera.lookAt(scene.position);



 // Funzione di rendering della scena
 function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera); // Esegui il rendering della scena
 }
 animate();
  