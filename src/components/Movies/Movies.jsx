import React, { useState } from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Pagination from "@mui/material/Pagination";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
import Spinner from "../../utils/UI/Spinner";

const Movies = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory,
  );
  const {
    data: movies,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;

  if (location.pathname === "/approved") {
    window.history.replaceState(null, "Movies", "/");
  }

  const handleChangePage = (event, step) => {
    setPage(step);
  };

  if (isLoading || isFetching) {
    return <Spinner height="50dvh" />;
  }

  if (!movies.results.length) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name. <br /> Please search for something
          else...
        </Typography>
      </Box>
    );
  }
  if (isError) {
    return error.message;
  }
  return (
    <>
      <Helmet>
        <title>FrameFlow - Your Personal Movie Universe, One Click Away</title>
      </Helmet>
      <FeaturedMovie movie={movies?.results[0]} />
      <MovieList movies={movies} numberOfMovies={numberOfMovies} excludeFirst />
      <Box display="flex" justifyContent="center" marginTop="2rem">
        {movies?.total_pages > 1 ? (
          <Pagination
            page={page}
            onChange={handleChangePage}
            count={movies.total_pages}
          />
        ) : null}
      </Box>
    </>
  );
};
export default Movies;
