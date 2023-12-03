import { makeStyles } from "@mui/styles";

const drawerWidth = 240;
export default makeStyles((theme) => ({
  toolbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  navbar: {
    backgroundImage: "none !important",
    backgroundColor: theme.palette.mode === "light" && "#fffffe !important",
    color: theme.palette.mode === "light" && "#0f0e17 !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  linkButton: {
    "&:hover": {
      // color: "white !important",
      textDecoration: "none",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: "none !important",
    ":-webkit-scrollbar": {
      display: "none",
    },
  },
}));
