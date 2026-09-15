let peliculaTodas = []; // Variable global para almacenar todas las películas

/* Función para cargar las películas desde la API */
const peliculasCaja = document.querySelector(".caja-peliculas");
const formPelicula = document.querySelector("#form-pelicula");
const inputTitulo = document.querySelector("#titulo");
const inputDirector = document.querySelector("#director");
const inputAnio = document.querySelector("#anio");
const inputId = document.querySelector("#input-id");
const btnSubmit = document.querySelector("#btn-submit");

async function CargarPeliculas() {
    peliculasCaja.innerHTML = "";

    try {
        const response = await fetch("/api/peliculas");
        const peliculas = await response.json();
        peliculaTodas = peliculas; // Almacenar todas las películas en la variable global

        peliculas.forEach((pelicula) => {
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
                       </li>`;
        });
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
}

// desde del formulario
function mostrarFormularioPelicula(peliculaId) {
    const pelicula = peliculaTodas.find((p) => p.id === Number(peliculaId));
    /*Usamos el operador de fusión nula(nullish coalescing operator) (??) para asignar un valor por defecto en caso de que la propiedad sea null o undefined */
    if (!pelicula) return;

    inputTitulo.value = pelicula.titulo ?? "";
    inputDirector.value = pelicula.director ?? "";
    inputAnio.value = pelicula.anio ?? "";
    inputId.value = pelicula.id ?? "";

    formPelicula.action = "/editar-pelicula";
    btnSubmit.textContent = "Guardar cambios";
    // formPelicula.classList.remove('oculto');
}

peliculasCaja.addEventListener("click", (event) => {
    const accionbtn = event.target.closest(".accion");
    /*si no se hizo clicc en un botón de acción, salir de la función*/
    if (!accionbtn) return;

    const peliculaId = accionbtn.dataset.id;

    if (accionbtn.classList.contains("editar")) {
        mostrarFormularioPelicula(peliculaId);
        return;
    }
    if (accionbtn.classList.contains("eliminar")) {
        if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
            eliminarPelicula(peliculaId);
        }
    }
});

async function eliminarPelicula(peliculaId) {
    await fetch("/eliminar-pelicula", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: peliculaId }),
    });

    CargarPeliculas();
}

CargarPeliculas();
