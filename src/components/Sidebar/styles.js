import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "0.2% 0",
  },
  image: {
    width: "100%",
    filter: theme.palette.mode === "light" ? "dark" : "invert(1)",
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  genreImage: {
    filter: theme.palette.mode === "light" ? "dark" : "invert(1)",
  },
}));
