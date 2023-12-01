import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { userSelector, logout as logoutType } from "../../features/auth";
import RatedCards from "../RatedCards/RatedCards";
import { useGetListQuery } from "../../services/TMDB";

const Profile = () => {
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
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch(logoutType());
    navigate("/");
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout <ExitToApp />
        </Button>
      </Box>
      {user && user.avatar ? (
        <Box>
          <img
            style={{ borderRadius: "10px", maxWidth: "100px" }}
            src={`https://image.tmdb.org/t/p/w200/${user.avatar.tmdb.avatar_path}`}
            alt={user.username}
          />
        </Box>
      ) : null}
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography>Add favorites movies to see theme here!</Typography>
      ) : (
        <Box>
          <RatedCards
            title="Favorite Movies"
            movies={favoriteMovies?.results}
          />
          <RatedCards
            title="Watchlist Movies"
            movies={watchlistMovies?.results}
          />
        </Box>
      )}
    </Box>
  );
};
export default Profile;
