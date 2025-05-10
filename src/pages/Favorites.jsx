import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import { Typography } from '@mui/material';

export default function Favorites() {
  const { favorites } = useContext(MovieContext);
  return (
    <div>
      <Typography variant="h5">Your Favorites</Typography>
      <MovieGrid movies={favorites} />
    </div>
  );
}