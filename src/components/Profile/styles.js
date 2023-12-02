import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  profileContainer: {
    border: "1px solid",
    borderColor: "#0f0e17",
    borderRadius: "10px",
    padding: "2rem",
    margin: "10px auto",
    background: "#222",
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
    borderColor: "#0f0e17",
    borderRadius: "10px",
    padding: "2rem",
    margin: "10px auto",
    background: "#222",
  },
}));
