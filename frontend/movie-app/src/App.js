import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    try {
      setError("");
      const response = await axios.get(`http://localhost:8000/movies/${movieId}`);
      setMovie(response.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMovie(null);
    }
  };

  const deleteMovie = async () => {
    try {
      setError("");
      await axios.delete(`http://localhost:8000/movies/${movieId}`);
      setMovie(null);
      setError("Movie deleted");
    } catch (err) {
      console.error(err);
      setError(err.message);
      setMovie(null);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Movie Finder</h1>
      <input
        type="text"
        placeholder="Enter Movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        style={{ padding: "5px", fontSize: "16px" }}
      />
      <button onClick={fetchMovie} style={{ padding: "5px 10px", marginLeft: "10px", fontSize: "16px" }}>
        Fetch Movie
      </button>
      <button onClick={deleteMovie} style={{ padding: "5px 10px", marginLeft: "10px", fontSize: "16px", backgroundColor: "#CC0000", color: "white" }}>
        Delete Movie
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movie && (
        <p>
          <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
            <img src={movie.picture} alt={movie.name} style={{ width: "300px", borderRadius: "8px" }} />
            <h2>{movie.name}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
          </div>
        </p>
      )}
    </div>
  );
};

export default App;
