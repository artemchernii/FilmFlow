import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
// import { Movie } from '..';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => {
  const classes = useStyles();
  console.log('Movie list', movies);

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie) => <Movie key={movie.id} movie={movie} />)}
    </Grid>
  );
};

export default MovieList;
