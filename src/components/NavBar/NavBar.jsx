import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExitToApp,
  AccountCircle,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Sidebar from "../Sidebar/Sidebar";
import { fetchToken, moviesApi, createSessionId } from "../../utils";
import {
  setUser,
  userSelector,
  logout as logoutType,
} from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { isAuthenticated, user } = useSelector(userSelector);
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const dispatch = useDispatch();
  const { toggleColorMode } = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      dispatch(searchMovie(query));
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch(logoutType());
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className="dropdown-menu"
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/profile/${user.id}`}
      >
        <AccountCircle sx={{ mr: 1 }} /> Profile
      </MenuItem>
      <MenuItem color="inherit" onClick={logout}>
        <ExitToApp sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuthenticated ? (
        <MenuItem
          color="inherit"
          sx={{ textTransform: "capitalize" }}
          size="large"
          onClick={() => fetchToken()}
          edge="end"
          aria-label="Login"
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <AccountCircle sx={{ mr: 1 }} /> Login
        </MenuItem>
      ) : (
        <MenuItem
          sx={{ justifyContent: "flex-start" }}
          onClick={handleMenuClose}
          component={Link}
          to={`/profile/${user.id}`}
        >
          <AccountCircle sx={{ mr: 1 }} /> Profile
        </MenuItem>
      )}

      <MenuItem
        sx={{ justifyContent: "flex-start" }}
        color="inherit"
        onClick={() => toggleColorMode()}
      >
        {theme.palette.mode === "dark" ? (
          <LightMode sx={{ mr: 1 }} />
        ) : (
          <DarkMode sx={{ mr: 1 }} />
        )}{" "}
        Theme: {theme.palette.mode}
      </MenuItem>
      {isAuthenticated && (
        <MenuItem
          sx={{ justifyContent: "flex-start" }}
          color="inherit"
          onClick={logout}
        >
          <ExitToApp sx={{ mr: 1 }} /> Logout
        </MenuItem>
      )}
    </Menu>
  );

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (
          sessionIdFromLocalStorage &&
          sessionIdFromLocalStorage !== "undefined"
        ) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`,
          );
          if (userData) dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`,
          );
          if (userData) dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
              sx={{ mr: 2, ml: 0 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={query}
              onKeyUp={handleKeyUp}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={() => toggleColorMode()}
            >
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                sx={{ textTransform: "capitalize" }}
                size="large"
                onClick={() => fetchToken()}
                edge="end"
                aria-label="Login"
                aria-controls={menuId}
                aria-haspopup="true"
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                className={classes.linkButton}
                sx={{ textTransform: "capitalize" }}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                size="large"
                edge="end"
              >
                {!isMobile && <>@{user.username} &nbsp;</>}
                <Avatar
                  style={{ width: 25, height: 25 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </Box>
          {/* Mobile menu icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* Sidebar */}
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              open
              classes={{ paper: classes.drawerPaper }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </Box>
  );
};
export default NavBar;
