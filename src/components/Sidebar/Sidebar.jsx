import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetGenresQuery } from "../../services/TMDB";
import useClasses from "./styles";
import genresIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import darkLogo from "../../assets/icons/FrameFlowLogo.svg";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const classes = useClasses();
  const { data, isFetching } = useGetGenresQuery();
  const [selected, setSelected] = useState("popular");

  const dispatch = useDispatch();

  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory,
  );

  useEffect(() => {
    setMobileOpen();
  }, [genreIdOrCategoryName]);

  const handleSelectGenreOrCategory = (value) => {
    setSelected(value);
    dispatch(selectGenreOrCategory(value));
  };

  return (
    <Box sx={{ borderLeft: "0.5px solid rgba(255,255,255, 0.1)" }}>
      <Link to="/" className={classes.imageLink}>
        <img className={classes.image} src={darkLogo} alt="Filmpire logo" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItemButton
              selected={selected === value}
              onClick={() => handleSelectGenreOrCategory(value)}
            >
              <ListItemIcon>
                <img
                  src={genresIcons[label.toLowerCase()]}
                  alt="genre icon"
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body2" style={{ fontWeight: "bold" }}>
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItemButton
                onClick={() => handleSelectGenreOrCategory(id)}
                selected={selected === id}
              >
                <ListItemIcon>
                  <img
                    src={genresIcons[name.toLowerCase()]}
                    alt="genre icon"
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      {name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
