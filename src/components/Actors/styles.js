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
    boxShadow: "0.5em 0.5em 1em rgba(0,0,0, .4)",
    maxWidth: "90%",
    maxHeight: "600px",
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-around",
    },
  },
  backButton: {
    color:
      theme.palette.mode === "light"
        ? `#0f0e17 !important`
        : "#a7a9be !important",
    borderColor:
      theme.palette.mode === "light"
        ? `#0f0e17 !important`
        : "#a7a9be !important",
  },
}));
