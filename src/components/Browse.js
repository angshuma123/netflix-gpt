// In Browse.js
import React, { useEffect } from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {
  const { getNewMovies } = useNowPlayingMovies();

  useEffect(() => {
    getNewMovies();
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default Browse;

