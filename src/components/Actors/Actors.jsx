import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button, ButtonGroup, Grid, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";

import useStyles from "./styles";
import {
  useGetActorInformationQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Spinner from "../../utils/UI/Spinner";

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
    return <Spinner marginTop="1rem" />;
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
          alt={actor?.name || "Actor"}
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
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          {actor?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" align="center" gutterBottom>
            Born: {new Date(actor?.birthday).toDateString()}
          </Typography>
          <Typography variant="subtitle1">
            {actor?.place_of_birth ? actor?.place_of_birth : null}
          </Typography>
        </Box>
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
              className={classes.backButton}
            >
              IMDB
            </Button>
            <Button
              component={Link}
              to="/"
              endIcon={<ArrowBack />}
              className={classes.backButton}
            >
              Back
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h3"
          sx={{ fontSize: "2rem" }}
          align="center"
          gutterBottom
        >
          Explore movies starring {actor.name}
        </Typography>
        {relatedMovies && !isFetchingRelatedMovies ? (
          <div>
            <MovieList movies={relatedMovies} numberOfMovies={12} />
            <Box display="flex" justifyContent="center">
              {relatedMovies?.total_pages > 1 ? (
                <Pagination
                  page={page}
                  onChange={handleChangePage}
                  count={relatedMovies.total_pages}
                />
              ) : null}
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
