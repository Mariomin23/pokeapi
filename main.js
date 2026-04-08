// main.js
import { obtenerPokemon, renderizarPokemon } from './api.js';

// Tu lista personalizada
const misPokemones = [
    "pikachu", "dragonite", "squirtle", 
    "charmander", "cubone", "bulbasaur", 
    "blastoise", "snorlax"
];

const imgElement = document.getElementById("pokemon-img");
const nameElement = document.getElementById("pokemon-name");
const container = document.getElementById("img-container");

const ejecutarCambio = async () => {
    // Seleccionamos uno al azar
    const randomIdx = Math.floor(Math.random() * misPokemones.length);
    const pokemonEnTurno = misPokemones[randomIdx];
    
    const datos = await obtenerPokemon(pokemonEnTurno);
    renderizarPokemon(datos, imgElement, nameElement, container);
};

// Intervalo un poco más largo para disfrutar la imagen
setInterval(ejecutarCambio, 4000);
ejecutarCambio();