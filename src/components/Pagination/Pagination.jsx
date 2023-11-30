import React from "react";
import { Typography, Button } from "@mui/material";
import useStyles from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className={classes.container}>
      <Button
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <Typography variant="h5" className={classes.pageNumber}>
        {currentPage} / {totalPages}
      </Typography>
      <Button
        onClick={handleNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
