import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// import { MovieList } from '..';
import MovieList from '../MovieList/MovieList';

import { useGetMoviesQuery } from '../../services/TMDB';

const Movies = () => {
  const { data: movies, isLoading, isSuccess, isError, error } = useGetMoviesQuery();
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!movies.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">No movies that match that name. <br /> Please search for something else...</Typography>
      </Box>
    );
  }
  if (isError) {
    return error.message;
  }
  return (
    <>
      <div>Movies</div>
      {isSuccess && <MovieList movies={movies} />}
    </>
  );
};
export default Movies;

