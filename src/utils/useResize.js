import { useEffect, useState } from 'react';

const useResize = (width) => {
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

  const resetMovieCountMore = (width) => {
    let moviesCountMoreUpd = 0;
    if (width >= 1100) {
      moviesCountMoreUpd = 3;
    } else if (width <= 690) {
      moviesCountMoreUpd = 2;
    } else {
      moviesCountMoreUpd = 2;
    }
    return moviesCountMoreUpd;
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
  }, [width]);

  return [moviesCountStart, moviesCountMore];
};

export default useResize;
