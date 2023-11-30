import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),

  endpoints: (builder) => ({
    // *Get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // *Get movies by search query
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // *Get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // *Get movies by genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // *Get movies by genre (default)
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // *Get genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // *Get movie by id
    getMovie: builder.query({
      query: ({ id }) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    // *Get recommendations movies by id
    getRecommendations: builder.query({
      query: ({ id, list, page = 1 }) =>
        `/movie/${id}/${list}?page=${page}&api_key=${tmdbApiKey}`,
    }),
    // *Get Actor information by id
    getActorInformation: builder.query({
      query: ({ id }) =>
        `/person/${id}?append_to_response=images,movie_credits&api_key=${tmdbApiKey}`,
    }),
    // *Get related movies by id
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_people=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    // *Get list movies by id
    getList: builder.query({
      query: ({ id, page, list, sessionId }) =>
        `/account/${id}/${list}?session_id=${sessionId}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});
export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorInformationQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
