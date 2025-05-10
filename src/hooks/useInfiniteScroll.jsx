import { useEffect } from 'react';

export default function useInfiniteScroll(callback) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback();
    });
    const sentinel = document.querySelector('#scroll-sentinel');
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [callback]);
}