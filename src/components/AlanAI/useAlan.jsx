import { useEffect, useContext } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { fetchToken } from "../../utils";
import {
  searchMovie,
  selectGenreOrCategory,
} from "../../features/currentGenreOrCategory";

const useAlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: "974534b685a56e731184599c7d0071a02e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        switch (command) {
          case "changeMode":
            if (mode === "light") {
              setMode("light");
            } else {
              setMode("dark");
            }
            break;
          case "login":
            fetchToken();
            break;
          case "logout":
            localStorage.clear();
            window.location.href = "/";
            break;
          case "chooseGenre": {
            const foundGenre = genres.find(
              (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase(),
            );

            if (foundGenre) {
              navigate("/");
              dispatch(selectGenreOrCategory(foundGenre.id));
            } else {
              const category = genreOrCategory.startsWith("top")
                ? "top_rated"
                : genreOrCategory;
              navigate("/");
              dispatch(selectGenreOrCategory(category));
            }
            break;
          }
          case "search":
            dispatch(searchMovie(query));
            break;
          default:
            return "";
        }
        return null;
      },
    });
  }, [dispatch, navigate, setMode]);
};

export default useAlan;
