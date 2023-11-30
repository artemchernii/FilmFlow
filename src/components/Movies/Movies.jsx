import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";

const Movies = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory,
  );
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 17 : 19;

  if (location.pathname === "/approved") {
    window.history.replaceState(null, "Movies", "/");
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50dvh"
      >
        <CircularProgress />
      </Box>
    );
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
      <FeaturedMovie movie={movies?.results[0]} />
      <MovieList movies={movies} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={movies.total_pages}
      />
    </>
  );
};
export default Movies;
