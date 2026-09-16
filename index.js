import express from "express";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar middleware para procesar datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

const peliculas = [
    {
        id: Date.now(),
        titulo: "El Padrino",
        director: "Francis Ford Coppola",
        anio: 1972,
    },
    {
        id: Date.now() + 1,
        titulo: "Pulp Fiction",
        director: "Quentin Tarantino",
        anio: 1994,
    },
    {
        id: Date.now() + 2,
        titulo: "Parásitos",
        director: "Bong Joon-ho",
        anio: 2019,
    },
    {
        id: Date.now() + 3,
        titulo: "Cadena perpetua",
        director: "Frank Darabont ",
        anio: 1994,
    },
    {
        id: Date.now() + 4,
        titulo: "Matrix",
        director: " Lana Wachowski y Lilly Wachowski ",
        anio: 1994,
    },
    {
        id: Date.now() + 5,
        titulo: "Pulp Fiction",
        director: "Quentin Tarantino",
        anio: 1994,
    },
    {
        id: Date.now() + 6,
        titulo: "Avatar",
        director: "James Cameron",
        anio: 2009,
    },
];
//   Titanic – James Cameron (1997)
//   Avengers: Endgame – Anthony y Joe Russo (2019)
//   Star Wars: Episodio VII - El despertar de la Fuerza – J.J. Abrams (2015)
//   Vengadores: Infinity War – Anthony y Joe Russo (2018)

app.get("/api/peliculas", (req, res) => {
    res.json(peliculas);
});

app.post("/anadir-pelicula", (req, res) => {
    const { titulo, director } = req.body; //Recibe los datos de una nueva película desde un formulario
    const anio = Number(req.body.anio); // Convertir el año a número

    if (!titulo || !director || !anio) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    const nuevaPelicula = {
        id: Date.now(),
        titulo,
        director,
        anio: Number(anio),
    };

    peliculas.push(nuevaPelicula);
    res.redirect("/?added=1"); //redirigir a la página principal con un parámetro de consulta para indicar que se añadió una película
});

app.post("/editar-pelicula", (req, res) => {
    const { id, titulo, director, anio } = req.body;


    if (!id || !titulo || !director || !anio) {
        return res
            .status(400)
            .json({ error: "Todos los campos son obligatorios" });
    }

    const peliculaIndex = peliculas.findIndex(
        (pelicula) => pelicula.id === Number(id),
    );

    if (peliculaIndex === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    peliculas[peliculaIndex] = {
        id: Number(id),
        titulo,
        director,
        anio: Number(anio),
    };

    res.redirect("/?edited=1"); //redirigir a la página principal con un parámetro de consulta para indicar que se editó una película
});

app.delete("/eliminar-pelicula", (req, res) => {
    const { id } = req.body; //Recibe el id de la película a eliminar desde el body de la solicitud DELETE

    if (!id) {
        return res.status(400).json({ error: "ID de película es obligatorio" });
    }
    const peliculaIndex = peliculas.findIndex(
        (pelicula) => pelicula.id === Number(id),
    );
    if (peliculaIndex === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    const peliculaEliminada = peliculas.splice(peliculaIndex, 1)[0]; //Elimina la película del array y devuelve la película eliminada
    res.json({
        message: "Película eliminada correctamente",
        pelicula: peliculaEliminada,
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
