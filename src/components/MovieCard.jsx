import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const { favorites, setFavorites } = useContext(MovieContext);
  const isFav = favorites.some(f => f.id === movie.id);

  const toggleFav = () => {
    setFavorites(isFav ? favorites.filter(f => f.id !== movie.id) : [...favorites, movie]);
  };

  return (
    <Card sx={{ maxWidth: 200 }}>
      <Link to={`/movie/${movie.id}`}>          
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average}
        </Typography>
        <IconButton onClick={toggleFav} sx={{ color: isFav ? 'red' : 'grey' }}>
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}