import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  poster: {
    borderRadius: "20px",
    boxShadow:
      theme.palette.mode === "light"
        ? "0.1em 0.2em 0.3em rgb(64,64,64)"
        : "none",
    width: "100%",
    height: "max-content",
    marginTop: "20px",
    marginBottom: "10px",
    filter: "none",

    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "50%",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "350px",
      marginBottom: "30px",
    },
  },
  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  genreImage: {
    filter: theme.palette.mode === "light" ? "dark" : "invert(1)",
    marginRight: "10px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1rem",
    },
  },
  castImage: {
    borderRadius: "10px",
    width: "100%",
    maxWidth: "7em",
    height: "8em",
    objectFit: "cover",
    boxShadow: "1px 3px 8px rgba(0,0,0, .3)",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column !important",
    },
  },
  buttonLink: {
    color:
      theme.palette.mode === "light"
        ? `#0f0e17 !important`
        : "#a7a9be !important",
    borderColor:
      theme.palette.mode === "light"
        ? `#0f0e17 !important`
        : "#a7a9be !important",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "70%",
    height: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      height: "90%",
    },
  },
}));
