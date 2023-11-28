import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];
  console.log('Profile', { params, navigate, user });
  const logout = () => {
    localStorage.clear();

    navigate('/');
  };
  return (
    <Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>Logout {' '} <ExitToApp /></Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography>Add favorites movies to see theme here!</Typography>
      )
        : <Box>FAVS</Box>}
    </Box>
  );
};
export default Profile;

