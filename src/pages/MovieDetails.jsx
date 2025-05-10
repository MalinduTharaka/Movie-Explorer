import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdb';
import { Typography, Chip, Box } from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  const trailer = movie.videos.results.find(v => v.type === 'Trailer');

  return (
    <Box>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography>{movie.overview}</Typography>
      {movie.genres.map(g => <Chip key={g.id} label={g.name} sx={{ mr: 1 }} />)}
      <Typography variant="h6" sx={{ mt: 2 }}>Cast</Typography>
      {movie.credits.cast.slice(0, 5).map(c => (
        <Typography key={c.id}>{c.name} as {c.character}</Typography>
      ))}
      {trailer && (
        <Box sx={{ mt: 3 }}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allow="autoplay; encrypted-media"
          />
        </Box>
      )}
    </Box>
  );
}