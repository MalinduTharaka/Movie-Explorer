// src/api/tmdb.js
import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}` },
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
});

export const fetchTrending = (page = 1) => tmdb.get('/trending/movie/week', { params: { page } });
export const searchMovies = (query, page = 1) => tmdb.get('/search/movie', { params: { query, page } });
export const fetchMovieDetails = id => tmdb.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits' } });
export const fetchGenres = () => tmdb.get('/genre/movie/list');
export const fetchFilteredMovies = ({ genreId, year, rating, page = 1 }) =>
  tmdb.get('/discover/movie', {
    params: {
      with_genres: genreId || '',
      primary_release_year: year || '',
      'vote_average.gte': rating || '',
      sort_by: 'popularity.desc',
      page,
    },
  });