import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector, logout as logoutType } from '../../features/auth';

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const favoriteMovies = [];
  console.log('Profile', { params, navigate, user });
  const logout = () => {
    localStorage.clear();
    dispatch(logoutType());
    navigate('/');
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">My Profile</Typography>
        <Button color="inherit" onClick={logout}>Logout {' '} <ExitToApp /></Button>
      </Box>
      {user && user.avatar ? (
        <Box>
          <img
            style={{ borderRadius: '10px', maxWidth: '100px' }}
            src={`https://image.tmdb.org/t/p/w200/${user.avatar.tmdb.avatar_path}`}
            alt={user.username}
          />
        </Box>
      ) : null}
      {!favoriteMovies.length ? (
        <Typography>Add favorites movies to see theme here!</Typography>
      )
        : <Box>FAVS</Box>}
    </Box>
  );
};
export default Profile;

