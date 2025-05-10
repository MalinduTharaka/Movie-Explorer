// src/components/SearchBar.jsx
import { useState, useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  IconButton,
  Button,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeModeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import {
  fetchGenres,
  fetchFilteredMovies,
  fetchTrending,
} from '../api/tmdb';

export default function SearchBar({ setMovies }) {
  const [query, setQuery] = useState('');
  const { setLastSearch } = useContext(MovieContext);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeModeContext);

  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genreId: '',
    year: '',
    rating: '',
  });

  // Load available genres on mount
  useEffect(() => {
    fetchGenres()
      .then(res => setGenres(res.data.genres))
      .catch(err => console.error('Failed to load genres:', err));
  }, []);

  // Full-text search handler
  const handleSubmit = e => {
    e.preventDefault();
    setLastSearch(query);
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  // Trending button handler
  const handleTrending = async () => {
    try {
      const res = await fetchTrending();
      setMovies(res.data.results);
      setLastSearch('');
      navigate(`/`); // clear any existing search param
    } catch (err) {
      console.error('Error fetching trending:', err);
    }
  };

  // Filter button handler
  const handleFilterSubmit = async () => {
    // If no filters selected, treat as trending
    if (!filters.genreId && !filters.year && !filters.rating) {
      return handleTrending();
    }
    try {
      const res = await fetchFilteredMovies(filters);
      setMovies(res.data.results);
      setLastSearch('');
      navigate(`/`);
    } catch (err) {
      console.error('Error fetching filtered movies:', err);
    }
  };

  // Update local filter state
  const handleFilterChange = e =>
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Theme Toggle */}
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      {/* Trending & Filters */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: '0.5rem',
        }}
      >
        <Button variant="contained" onClick={handleTrending}>
          Trending Movies
        </Button>

        <TextField
          select
          label="Genre"
          name="genreId"
          value={filters.genreId}
          onChange={handleFilterChange}
          size="small"
          SelectProps={{ displayEmpty: true }}
        >
          <MenuItem disabled value="">
            All Genres
          </MenuItem>
          {genres.map(g => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Year"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          size="small"
          SelectProps={{ displayEmpty: true }}
        >
          <MenuItem disabled value="">
            All Years
          </MenuItem>
          {Array.from({ length: 25 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          select
          label="Rating ≥"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          size="small"
          SelectProps={{ displayEmpty: true }}
        >
          <MenuItem disabled value="">
            All Ratings
          </MenuItem>
          {[...Array(10)].map((_, i) => {
            const r = 10 - i;
            return (
              <MenuItem key={r} value={r}>
                {r}+
              </MenuItem>
            );
          })}
        </TextField>

        <Button variant="outlined" onClick={handleFilterSubmit}>
          Apply Filters
        </Button>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          marginTop: '1rem',
          gap: '0.5rem',
        }}
      >
        <TextField
          fullWidth
          placeholder="Search movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          size="small"
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
}
