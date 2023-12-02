import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner = ({ size, height, marginTop }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height && height}
      marginTop={marginTop && marginTop}
    >
      <CircularProgress size={size && size} />
    </Box>
  );
};

export default Spinner;
