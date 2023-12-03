import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  movie: {
    padding: "10px",
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width: "230px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    marginTop: "10px",
    marginBottom: 0,
    textAlign: "center",
    textDecoration: "none",
  },
  links: {
    alignItems: "center",
    fontWeight: "bold",
    position: "relative",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    borderRadius: "20px",
    // height: "300px",
    width: "100%",
    marginBottom: "10px",
    transition: "transform 0.25s ease",
    position: "relative",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  rating: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    top: "0px",
    width: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: "1px",
    color: "#fffffe",
    background: "rgba(0,0,0, .3)",
  },
}));
