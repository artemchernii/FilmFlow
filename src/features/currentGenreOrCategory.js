/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory(state, action) {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    searchMovie(state, action) {
      state.searchQuery = action.payload;
    },
  },
});
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export const genreOrCategoryReducer = genreOrCategory.reducer;
