import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="h1">404 - Not Found</Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Link
        style={{
          border: "1px solid #fffffe",
          color: "#fffffe",
          padding: "5px 15px",
          borderRadius: "5px",
          margin: "20px 0",
          display: "inline-block",
        }}
        to="/"
      >
        To homepage
      </Link>
    </Box>
  );
};

export default NotFound;
