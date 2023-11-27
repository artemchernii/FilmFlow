import React from 'react';
import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';
import useStyles from './styles';

// import { Movie } from '..';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => <Movie key={movie.id} movie={movie} index={i} />)}
    </Grid>
  );
};

export default MovieList;
