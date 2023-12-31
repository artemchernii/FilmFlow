import React from "react";
import { Grid } from "@mui/material";
import Movie from "../Movie/Movie";
import useStyles from "./styles";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results
        .slice(excludeFirst ? 1 : 0, numberOfMovies)
        .filter((movie) => movie.poster_path)
        .map((movie, i) => (
          <Movie key={movie.id} movie={movie} index={i} />
        ))}
    </Grid>
  );
};

export default MovieList;
