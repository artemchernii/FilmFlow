import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  profileContainer: {
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#0f0e17" : "transparent",
    borderRadius: "10px",
    padding: "2rem",
    margin: "10px auto",
    background: theme.palette.mode === "dark" ? "#222" : "#fffffe",
    boxShadow:
      theme.palette.mode === "dark" ? "none" : "1px 3px 10px rgba(0,0,0,.4)",
    // background:
    //   "radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 99.2%)",
  },
  profileContent: {
    display: "flex",
    // flexDirection: "column",
    alignItems: "flex-end",
  },
  profileImage: {
    maxWidth: "100px",
    border: "1px solid #a7a9be",
    borderRadius: "50%",
    boxShadow: "1px 1px 3px rgba(255,255,255, .2)",
  },
  listOfWatchlistAndFav: {
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? "#0f0e17" : "transparent",
    borderRadius: "10px",
    padding: "2rem",
    margin: "10px auto",
    background: theme.palette.mode === "dark" ? "#222" : "#fffffe",
    boxShadow:
      theme.palette.mode === "dark" ? "none" : "1px 3px 10px rgba(0,0,0,.4)",
  },
}));
