import { useState, useEffect } from 'react';
import { fetchTrending } from '../api/tmdb';
import MovieGrid from './MovieGrid';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Button } from '@mui/material';

export default function Trending() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => setPage(p => p + 1);

  useInfiniteScroll(loadMore);

  useEffect(() => {
    fetchTrending(page).then(res => {
      setMovies(prev => [...prev, ...res.data.results]);
      if (page >= res.data.total_pages) setHasMore(false);
    });
  }, [page]);

  return (
    <>
      <MovieGrid movies={movies} />
      {hasMore && <Button onClick={loadMore} id="scroll-sentinel">Load More</Button>}
    </>
  );
}