import { useEffect, useState } from 'react';

const useResize = (width) => {
  const resetMovieCountMore = (width) => (width >= 1100 ? 3 : 2);
  const resetMovieCountStart = (width) => {
    let moviesCountStartUpd = 0;
    if (width >= 1100) {
      moviesCountStartUpd = 12;
    } else if (width <= 690) {
      moviesCountStartUpd = 5;
    } else {
      moviesCountStartUpd = 8;
    }
    return moviesCountStartUpd;
  };

  const [moviesCountStart, setMoviesCountStart] = useState(
    resetMovieCountStart(width)
  );
  const [moviesCountMore, setMoviesCountMore] = useState(
    resetMovieCountMore(width)
  );

  useEffect(() => {
    // if (moviesCountStart < moviesCountStartUpd) {
    setMoviesCountStart(resetMovieCountStart(width));
    // }
    setMoviesCountMore(resetMovieCountMore(width));
    return () => {
      setMoviesCountStart(resetMovieCountStart(width));
      setMoviesCountMore(resetMovieCountMore(width));
    };
  }, [width]);

  return [moviesCountStart, moviesCountMore];
};

export default useResize;
