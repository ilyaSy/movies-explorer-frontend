import { useEffect, useState } from 'react';
import {
  desktopMovieCountStart,
  desktopMovieCountMore,
  laptopMovieCountStart,
  laptopMovieCountMore,
  mobileMovieCountStart,
  mobileMovieCountMore,
} from './constants';

const useResize = (width) => {
  const resetMovieCountMore = (width) => {
    let moviesCountMoreUpd = 0;
    if (width >= 1100) {
      moviesCountMoreUpd = desktopMovieCountMore;
    } else if (width <= 690) {
      moviesCountMoreUpd = mobileMovieCountMore;
    } else {
      moviesCountMoreUpd = laptopMovieCountMore;
    }
    return moviesCountMoreUpd;
  };
  
  const resetMovieCountStart = (width) => {
    let moviesCountStartUpd = 0;
    if (width >= 1100) {
      moviesCountStartUpd = desktopMovieCountStart;
    } else if (width <= 690) {
      moviesCountStartUpd = mobileMovieCountStart;
    } else {
      moviesCountStartUpd = laptopMovieCountStart;
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
