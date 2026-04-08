// api.js

export const obtenerPokemon = async (nombre) => {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        const datos = await respuesta.json();
        
        const urlImagen = datos.sprites.other['official-artwork'].front_default;

        // --- TRUCO PARA TRANSICIÓN SUAVE ---
        // Creamos una promesa que se resuelve solo cuando la imagen carga
        await new Promise((resolve) => {
            const img = new Image();
            img.src = urlImagen;
            img.onload = resolve; // Espera a que el navegador la tenga lista
        });

        return {
            nombre: datos.name,
            imagen: urlImagen
        };
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const renderizarPokemon = (datos, imgElement, nameElement, container) => {
    if (!datos) return;

    // Primero quitamos la visibilidad para que no se vea el cambio brusco
    container.style.opacity = "0";

    setTimeout(() => {
        imgElement.src = datos.imagen;
        nameElement.innerText = datos.nombre;
        // Volvemos a mostrar con la animación
        container.style.opacity = "1";
        container.classList.remove("fade-in");
        void container.offsetWidth; 
        container.classList.add("fade-in");
    }, 300); // Pequeño delay para que el "fade out" sea natural
};