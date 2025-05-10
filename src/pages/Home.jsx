// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { Typography } from '@mui/material';

export default function Home() {
  const [params] = useSearchParams();
  const query = params.get('search');
  const [movies, setMovies] = useState([]);

  // When the user submits a search (navigate to "/?search=…"), fetch and populate.
  useEffect(() => {
    if (query) {
      searchMovies(query)
        .then(res => setMovies(res.data.results))
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div>
      {/* Pass setMovies down so SearchBar’s Trending/Filter buttons can update */}
      <SearchBar setMovies={setMovies} />

      {query ? (
        <>
          <Typography variant="h5" gutterBottom>
            Search Results for “{query}”
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Trending & Filtered Movies
        </Typography>
      )}

      {/* Always render the grid from the same movies state */}
      <MovieGrid movies={movies} />
    </div>
  );
}
