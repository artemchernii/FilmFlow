import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import {
  useGetRecommendationsQuery,
  useGetMovieQuery,
  useGetListQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import genresIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import MovieList from "../MovieList/MovieList";
import { userSelector } from "../../features/auth";

const MovieInformation = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);

  const { data: movie, isFetching, isError } = useGetMovieQuery({ id });
  const {
    data: recommendations,
    isFetching: isFetchingRecommendation,
    isErrorRecommendation,
  } = useGetRecommendationsQuery({ id, list: "/recommendations", page });
  const { data: favoriteMovies } = useGetListQuery({
    id,
    page,
    list: "favorite/movies",
    sessionId: localStorage.getItem("session_id"),
  });
  const { data: watchlistMovies } = useGetListQuery({
    id,
    page,
    list: "watchlist/movies",
    sessionId: localStorage.getItem("session_id"),
  });
  const { user } = useSelector(userSelector);

  const [isMovieFavored, setIsMovieFavored] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavored(
      !!favoriteMovies?.results?.find((favMovie) => favMovie.id === +id),
    );
  }, [movie, favoriteMovies]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((favMovie) => favMovie.id === +id),
    );
  }, [movie, watchlistMovies]);

  const handleSelectGenre = (genreId) => {
    dispatch(selectGenreOrCategory(genreId));
  };
  const addToFavorite = async () => {
    const sessionId = localStorage.getItem("session_id") || null;
    if (!sessionId) {
      return;
    }
    const options = {
      media_type: "movie",
      media_id: id,
      favorite: !isMovieFavored,
    };
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
      options,
    );

    setIsMovieFavored((prevState) => !prevState);
  };
  const addToWatchlist = async () => {
    const sessionId = localStorage.getItem("session_id") || null;
    if (!sessionId) {
      return;
    }
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      },
    );

    setIsMovieWatchlisted((prevState) => !prevState);
  };

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
      {/* Poster */}
      <Grid item display="flex" justifyContent="center" sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`http://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title}
        />
      </Grid>
      {/* Details */}
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {movie?.title} ({movie?.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {movie?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={Number(movie?.vote_average) / 2} />
            <Typography variant="subtitle1">
              {Number(movie?.vote_average).toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {movie?.runtime}min / Language: {movie?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {movie.genres.length > 0
            ? movie?.genres?.map((genre) => (
                <Link
                  key={genre.name}
                  className={classes.links}
                  to="/"
                  onClick={() => handleSelectGenre(genre.id)}
                >
                  <img
                    src={genresIcons[genre?.name.toLowerCase()]}
                    alt="genre icon"
                    className={classes.genreImage}
                    height={30}
                  />
                  <Typography color="textPrimary" variant="subtitle1">
                    {genre?.name}
                  </Typography>
                </Link>
              ))
            : null}
        </Grid>
        {/* Overview */}
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {movie?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        {/* Cast */}
        <Grid item container spacing={2}>
          {movie &&
            movie?.credits?.cast.slice(0, 10).map((character, i) =>
              character?.profile_path ? (
                <Grid
                  key={i}
                  item
                  xs={4}
                  md={2}
                  component={Link}
                  to={`/actors/${character.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    className={classes.castImage}
                    src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                    alt={character.name}
                  />
                  <Typography color="textPrimary">{character?.name}</Typography>
                  <Typography color="textSecondary">
                    {character?.character.split(" ")[0]}
                  </Typography>
                </Grid>
              ) : null,
            )}
        </Grid>
        {/* Additional functionality */}
        <Grid item container style={{ marginTop: "2rem" }}>
          {/* <div className={classes.buttonsContainer}> */}
          <Grid item xs={12} sm={12} className={classes.buttonsContainer}>
            <ButtonGroup size="medium" variant="outlined" fullWidth>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={movie?.homepage}
                endIcon={<Language />}
              >
                Website
              </Button>
              <Button
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${movie?.imdb_id}`}
                endIcon={<MovieIcon />}
              >
                IMDB
              </Button>
              <Button
                onClick={() => setIsOpenModal(true)}
                href="#"
                endIcon={<Theaters />}
              >
                Trailer
              </Button>
            </ButtonGroup>
            <ButtonGroup size="medium" variant="outlined" fullWidth>
              <Button
                onClick={addToFavorite}
                endIcon={
                  isMovieFavored ? <FavoriteBorderOutlined /> : <Favorite />
                }
              >
                {isMovieFavored ? "Unfavorite" : "Favorite"}
              </Button>
              <Button
                onClick={addToWatchlist}
                endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
              >
                WatchList
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
          {/* </div> */}
        </Grid>
      </Grid>
      {/* Recommendation */}

      {recommendations &&
      recommendations?.results.length > 0 &&
      !isFetchingRecommendation ? (
        <Box marginTop="5rem" width="100%">
          <Typography variant="h3" alignt="center" gutterBottom>
            You might also like
          </Typography>
          <Box>
            <MovieList movies={recommendations} numberOfMovies={12} />
            <Box display="flex" justifyContent="center">
              <Pagination
                page={page}
                onChange={handleChangePage}
                count={recommendations.total_pages}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box marginTop="2rem">
          <Typography variant="h5" alignt="center" gutterBottom>
            Sorry, nothing to recommend.
          </Typography>
        </Box>
      )}
      {isErrorRecommendation ? <Box>Something went wrong</Box> : null}

      {/* Modal */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        {movie?.videos?.results?.length > 0 ? (
          <iframe
            title="Trailer"
            autoPlay
            className={classes.video}
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            allow="autoplay"
          />
        ) : (
          <Box>
            <Typography variant="body1">Trailers not found</Typography>
          </Box>
        )}
      </Modal>
    </Grid>
  );
};
export default MovieInformation;
