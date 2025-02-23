const express = require('express');
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());

let movies = [
    { id: "inception", name: "Inception", year: 2010, picture: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c_500x749.jpg?v=1708527589" },
    { id: "matrix", name: "The Matrix", year: 1999, picture: "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/Matrix.mpw.102176_bb2f6cc5-4a16-4512-881b-f855ead3c8ec_500x749.jpg?v=1708703624" },
    { id: "gladiator", name: "Gladiator", year: 2000, picture: "https://www.movieposters.com/cdn/shop/files/Gladiator.mpw.102813_480x.progressive.jpg?v=1707500493" },
    { id: "dune", name: "Dune", year: 2021, picture: "https://www.movieposters.com/cdn/shop/products/ItemN241475_jpg_480x.progressive.jpg?v=1641576614" },
    { id: "starwars", name: "Star Wars", year: 1977, picture: "https://www.movieposters.com/cdn/shop/products/6cd691e19fffbe57b353cb120deaeb8f_8489d7bf-24ba-4848-9d0f-11f20cb35025_480x.progressive.jpg?v=1573613877" },
    { id: "lordrings", name: "Lord of the Rings", year: 2001, picture: "https://www.movieposters.com/cdn/shop/files/ItemP2658_jpg_480x.progressive.jpg?v=1692302023" }
];

const verifyAccessToken = () => async (req, res, next) => {
    next();
};

app.get('/movies/:id', verifyAccessToken(), (req, res) => {
    const movie = movies.find(m => m.id === req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.send(movie);
});

app.delete('/movies/:id', verifyAccessToken(), (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === req.params.id);
    if (movieIndex === -1) return res.status(404).send('Movie not found');
    const deletedMovie = movies.splice(movieIndex, 1);
    res.send(deletedMovie[0]);
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
