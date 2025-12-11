import { useEffect, useState } from "react";
import "./App.css";
import Search from "./Components/Search";
import { Spinner } from "flowbite-react";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search term (500ms)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch Movies
  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMsg("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error(`TMDB Error: ${response.status}`);

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMsg("Failed to fetch movies. Please try again later.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending movies
  const loadTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/week`,
        API_OPTIONS
      );

      if (!response.ok) throw new Error(`TMDB Error: ${response.status}`);

      const data = await response.json();
      setTrendingMovies(data.results.slice(0, 10) || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      setTrendingMovies([]);
    }
  };

  // Load trending movies on page load
  useEffect(() => {
    loadTrendingMovies();
    fetchMovies();
  }, []);

  // Fetch movies on debounced search term change
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
       
        <header>
          <img src="./hero.png" alt="Hero" />

          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchterm={searchTerm} setsearchterm={setSearchTerm} />
        </header>

        
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.id}>
                  <p>{index + 1}</p>

                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        
        <section className="all-movies">
          <h2>All Movies</h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : movies.length === 0 ? (
            <p className="text-gray-300">No movies found.</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id} className="movie-card">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-image h-64 bg-gray-700 rounded-lg" />
                  )}

                  <h3>{movie.title}</h3>

                  <div className="content">
                    <div className="rating">
                      <p>⭐ {movie.vote_average.toFixed(1)}</p>
                    </div>

                    <span className="year">
                      {movie.release_date?.split("-")[0] || "N/A"}
                    </span>

                    <span className="lang">{movie.original_language}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
