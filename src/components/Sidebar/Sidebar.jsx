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
import useClasses from './styles';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useClasses();

  useEffect(() => {
    console.log('sidebar', theme.palette.mode);
  }, []);

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
                <ListItemButton onClick={() => {}}>
                  {/* <ListItemIcon>
                    <img
                      src={redLogo}
                      alt="genre icon"
                      className={classes.genreImage}
                      height={30}
                    />
                  </ListItemIcon> */}
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
            demoCategories.map(({ label, value }) => (
              <Link key={value} className={classes.links} to="/">
                <ListItemButton onClick={() => {}}>
                  {/* <ListItemIcon>
                    <img
                      src={redLogo}
                      alt="genre icon"
                      className={classes.genreImage}
                      height={30}
                    />
                  </ListItemIcon> */}
                  <ListItemText primary={label} />
                </ListItemButton>
              </Link>
            ))
        }
      </List>
    </>
  );
};

export default Sidebar;
