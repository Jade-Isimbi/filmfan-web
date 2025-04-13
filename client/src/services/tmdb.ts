import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const Token = import.meta.env.VITE_TOKEN;
const tmdbApiToken = import.meta.env.VITE_TMDB_TOKEN;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("authorization", `Bearer ${Token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (id) => `/movies/${id}`,
    }),
    getCredits: builder.query({
      query: (id) => `/movies/${id}/credits`,
    }),
    getSimilarMovies: builder.query({
      query: (id) => `/movies/${id}/recommendations`,
    }),
    getMovieList: builder.query({
      query: () => "/movies",
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    test: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),

    postRating: builder.mutation({
      query: ({ id, rating }) => ({
        url: `/movies/${id}/rating`,
        method: "POST",
        body: { value: rating },
      }),
    }),
    postFavorite: builder.mutation({
      query: ({ media_id, favorite }) => ({
        url: `/movies/${media_id}/favorites`,
        method: "POST",
        body: { value: favorite },
      }),
    }),
  }),
});

export const {
  useGetMovieQuery,
  useLazyGetMovieQuery,
  useGetCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetMovieListQuery,
  usePostRatingMutation,
  usePostFavoriteMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = tmdbApi;
