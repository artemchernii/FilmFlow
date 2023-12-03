import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import useStyles from "./styles";
import useAlan from "./AlanAI/useAlan";
import { MovieInformation, NavBar, Profile, Movies, Actors } from ".";
import NotFound from "./NotFound/NotFound";

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef(null);
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {["/", "/approved"].map((path) => (
            <Route
              key="Movies" // optional: avoid full re-renders on route changes
              path={path}
              element={<Movies />}
            />
          ))}
          <Route path="movie/:id" element={<MovieInformation />} />
          <Route path="actors/:id" element={<Actors />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
