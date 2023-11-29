import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from './styles';
import Movie from '../Movie/Movie';

const RatedCards = ({ title, movies }) => {
  const classes = useStyles();
  console.log(movies);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        className={classes.container}
      >
        {movies && movies.length > 0 ? movies.map((movie, i) => <Movie key={i} movie={movie} index={i} />) : null}
      </Box>
    </Box>
  );
};

export default RatedCards;
