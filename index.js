import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar middleware para procesar datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const peliculas = [
    { id: Date.now(), titulo: 'El Padrino', director: 'Francis Ford Coppola', anio: 1972 },
    { id: Date.now() + 1, titulo: 'Pulp Fiction', director: 'Quentin Tarantino', anio: 1994 },
    { id: Date.now() + 2, titulo: 'Parásitos', director: 'Bong Joon-ho', anio: 2019 }
];

app.get('/api/peliculas', (req, res) => {
    res.json(peliculas);
});

app.post('/anadir/pelicula', (req, res) => {
    const { titulo, director, anio } = req.body; //Recibe los datos de una nueva película desde un formulario

    if (!titulo || !director || !anio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevaPelicula = { id: Date.now(), titulo, director, anio: Number(anio) };

    peliculas.push(nuevaPelicula);
    res.redirect('/?added=1');  //redirigir a la página principal con un parámetro de consulta para indicar que se añadió una película
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.post('editar/pelicula', (req, res) => {
    const { id, titulo, director, anio } = req.body;

    if (!id || !titulo || !director || !anio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const peliculaIndex = peliculas.findIndex(pelicula => pelicula.id === Number(id));

    if (peliculaIndex === -1) {
        return res.status(404).json({ error: 'Película no encontrada' });
    }

    peliculas[peliculaIndex] = { id: Number(id), titulo, director, anio: Number(anio) };

    res.redirect('/?edited=1');  //redirigir a la página principal con un parámetro de consulta para indicar que se editó una película


});