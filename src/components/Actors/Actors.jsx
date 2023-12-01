import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";

import useStyles from "./styles";
import {
  useGetActorInformationQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

const GENDERS = ["Not set / not specified", "Female", "Male", "Non-binary"];

const Actors = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const {
    data: actor,
    isFetching,
    isError,
  } = useGetActorInformationQuery({ id });
  const {
    data: relatedMovies,
    isFetching: isFetchingRelatedMovies,
    isError: isErrorRelatedMovies,
  } = useGetMoviesByActorIdQuery({ id, page });
  const handleChangePage = (event, step) => {
    setPage(step);
  };

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50dvh"
      >
        <CircularProgress size="6rem" />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something gone wrong - Go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid
        item
        display="flex"
        justifyContent="center"
        marginTop="1rem"
        sm={12}
        lg={4}
      >
        <img
          className={classes.poster}
          src={`http://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
          alt={actor?.name}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        marginTop="2rem"
        lg={7}
        padding="0 2rem"
      >
        <Helmet>
          <title>{actor?.name}</title>
          <meta name="description" content={actor?.biography} />
        </Helmet>
        <Typography variant="h3" align="center" gutterBottom>
          {actor?.name}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Born: {new Date(actor?.birthday).toDateString()} | Gender{" "}
          {actor?.gender && GENDERS[actor?.gender]}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          style={{ marginTop: "10px" }}
          paragraph
        >
          {actor?.biography && actor?.biography}
        </Typography>
        <Grid item container style={{ marginTop: "2rem" }}>
          <ButtonGroup
            size="medium"
            variant="outlined"
            className={classes.buttonsContainer}
          >
            <Button
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/name/${actor?.imdb_id}`}
              variant="contained"
              color="primary"
            >
              IMDB
            </Button>
            <Button
              component={Link}
              to="/"
              endIcon={<ArrowBack />}
              sx={{ borderColor: "primary.main" }}
            >
              <Typography color="inherit" variant="subtitle1">
                Back
              </Typography>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {relatedMovies && !isFetchingRelatedMovies ? (
          <div>
            <MovieList movies={relatedMovies} numberOfMovies={12} />
            <Box display="flex" justifyContent="center">
              <Pagination
                page={page}
                onChange={handleChangePage}
                count={relatedMovies.total_pages}
              />
            </Box>
          </div>
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
        {isErrorRelatedMovies ? <Box>Something went wrong</Box> : null}
      </Box>
    </Grid>
  );
};
export default Actors;
