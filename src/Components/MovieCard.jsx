import React from 'react'

const MovieCard = ({movies}) => {
  return (
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
  )
}

export default MovieCard
