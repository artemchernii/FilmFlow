import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import useClasses from './styles';
import genresIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useClasses();
  const { data, isFetching } = useGetGenresQuery();

  const dispatch = useDispatch();

  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  useEffect(() => {
    setMobileOpen();
    return () => console.log('clean up');
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {
            categories.map(({ label, value }) => (
              <Link key={value} className={classes.links} to="/">
                <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
                  <ListItemIcon>
                    <img
                      src={genresIcons[label.toLowerCase()]}
                      alt="genre icon"
                      className={classes.genreImage}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </Link>
            ))
        }
      </List>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {
          isFetching
            ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )
            : data.genres.map(({ id, name }) => (
              <Link key={id} className={classes.links} to="/">
                <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                  <ListItemIcon>
                    <img
                      src={genresIcons[name.toLowerCase()]}
                      alt="genre icon"
                      className={classes.genreImage}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            ))
        }
      </List>
    </>
  );
};

export default Sidebar;
