import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Tooltip,
  Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genresIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const MovieInformation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: movie, isFetching, isError } = useGetMovieQuery({ id });

  const classes = useStyles();
  const isMovieFavored = false;
  const isMovieWatchlisted = false;

  console.log('Movie Information', { id, movie });

  const handleSelectGenre = (genreId) => {
    dispatch(selectGenreOrCategory(genreId));
  };

  const addToFavorite = () => {};
  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50dvh">
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
      <Grid item display="flex" justifyContent="center" sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`http://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >{movie?.title} ({movie?.release_date.split('-')[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >{movie?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={Number(movie?.vote_average) / 2} />
            <Typography variant="subtitle1">{Number(movie?.vote_average).toFixed(1)} / 10</Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
          >{movie?.runtime}min / {movie?.spoken_languages.length > 0 ? movie?.spoken_languages[0].name : null}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {movie.genres.length > 0 ? movie?.genres?.map((genre, i) => (
            <Link key={genre.name} className={classes.links} to="/" onClick={() => handleSelectGenre(genre.id)}>
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
          )) : null}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {movie?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {movie && movie?.credits?.cast.slice(0, 10).map((character, i) => (

            character?.profile_path
              ? (
                <Grid
                  key={i}
                  item
                  xs={4}
                  md={2}
                  component={Link}
                  to={`/actors/${character.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className={classes.castImage}
                    src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                    alt={character.name}
                  />
                  <Typography color="textPrimary">{character?.name}</Typography>
                  <Typography color="textSecondary">{character?.character.split(' ')[0]}</Typography>
                </Grid>
              ) : null
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
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
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorite}
                  endIcon={isMovieFavored ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isMovieFavored ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button component={Link} to="/" endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography color="inherit" variant="subtitle1">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MovieInformation;
