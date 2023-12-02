import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { userSelector, logout as logoutType } from "../../features/auth";
import RatedCards from "../RatedCards/RatedCards";
import { useGetListQuery } from "../../services/TMDB";
import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [page] = useState(1);
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: favoriteMoviesRefetch } =
    useGetListQuery({
      id,
      page,
      list: "favorite/movies",
      sessionId: localStorage.getItem("session_id"),
    });
  const { data: watchlistMovies, refetch: watchlistMoviesRefetch } =
    useGetListQuery({
      id,
      page,
      list: "watchlist/movies",
      sessionId: localStorage.getItem("session_id"),
    });
  const dispatch = useDispatch();
  useEffect(() => {
    favoriteMoviesRefetch();
    watchlistMoviesRefetch();
  }, [favoriteMoviesRefetch, watchlistMoviesRefetch]);

  const logout = () => {
    localStorage.clear();
    dispatch(logoutType());
    navigate("/");
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.profileContainer}
      >
        <Box className={classes.profileContent}>
          {user && user.avatar ? (
            <Box>
              <img
                className={classes.profileImage}
                src={`https://image.tmdb.org/t/p/w200/${user.avatar.tmdb.avatar_path}`}
                alt={user.username}
              />
            </Box>
          ) : null}
          <Box padding="10px">
            <Typography variant="h5" fontWeight="bold">
              {user.username}
            </Typography>
            <Typography variant="subheader1" fontWeight="light">
              {user.name}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.profileContent}>
          <Button color="inherit" onClick={logout}>
            Logout <ExitToApp />
          </Button>
        </Box>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography>Add favorites movies to see theme here!</Typography>
      ) : (
        <Box className={classes.listOfWatchlistAndFav}>
          {favoriteMovies?.results?.length > 0 ? (
            <RatedCards
              title="Favorite Movies"
              movies={favoriteMovies?.results}
            />
          ) : null}
          {watchlistMovies?.results?.length > 0 ? (
            <RatedCards
              title="Watchlist Movies"
              movies={watchlistMovies?.results}
            />
          ) : null}
        </Box>
      )}
    </Box>
  );
};
export default Profile;
