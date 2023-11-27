import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const location = useLocation();

  console.log('Profile', { params, location });
  return <div>Profile</div>;
};
export default Profile;

