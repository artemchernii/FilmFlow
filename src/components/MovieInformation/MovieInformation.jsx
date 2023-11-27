import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const MovieInformation = () => {
  const params = useParams();
  const location = useLocation();
  console.log('Movie Information', { params, location });

  return <div>Movie Information</div>;
};
export default MovieInformation;
