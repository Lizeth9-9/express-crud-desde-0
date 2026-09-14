async function CargarPeliculas() {
    peliculasCaja.innerHTML = '';

    try {
        const response = await fetch('/api/peliculas');
        const peliculas = await response.json();

        peliculas.forEach(pelicula => {
            peliculasCaja.innerHTML += `
        <li class="pelicula">
            <h3>${pelicula.titulo}</h3>
            <p>Director: ${pelicula.director}</p>
            <p>Año: ${pelicula.anio}</p>
               <div class="operaciones-pelicula">
                      <button type="button" class="accion editar" data-id="${pelicula.id}" aria-label="Editar película">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button type="button" class="accion eliminar" data-id="${pelicula.id}" aria-label="Eliminar película">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                       </li>`
                ;
        });

    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}


