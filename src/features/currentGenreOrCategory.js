/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    // TODO: do we really need this page here?
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory(state, action) {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie(state, action) {
      state.searchQuery = action.payload;
    },
  },
});
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export const genreOrCategoryReducer = genreOrCategory.reducer;
