// In Browse.js
import React, { useEffect } from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopratedMovies from '../hooks/useTopratedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
   useNowPlayingMovies();
   usePopularMovies();
   useTopratedMovies();
   useUpcomingMovies();
   const showGptSearch=useSelector(store=>store.gpt.showGptSearch);

 

  return (
    <>
      <Header />
      { showGptSearch ? (<GptSearch/>) : <>
      (<MainContainer/>
      <SecondaryContainer/>)
      </>

      };
      
      
    </>
  );
};

export default Browse;

