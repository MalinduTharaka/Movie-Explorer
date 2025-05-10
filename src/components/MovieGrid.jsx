// src/components/MovieGrid.jsx
import MovieCard from './MovieCard';

export default function MovieGrid({ movies }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
