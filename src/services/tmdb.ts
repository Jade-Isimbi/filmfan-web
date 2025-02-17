import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY
const tmdbApiToken = import.meta.env.VITE_TOKEN

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
        prepareHeaders: (headers) => {
            headers.set('content-type', 'application/json')
            headers.set('authorization', `Bearer ${tmdbApiToken}`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getMovie: builder.query({
            query: (id) => `/movie/${id}?language=en-US&api_key=${tmdbApiKey}`,
        }),
        getCredits: builder.query({
            query: (id) =>
                `/movie/${id}/credits?language=en-US&api_key=${tmdbApiKey}`,
        }),
        getSimilarMovies: builder.query({
            query: (id) =>
                `/movie/${id}/recommendations?language=en-US&page=1&api_key=${tmdbApiKey}`,
        }),
        getMovieList: builder.query({
            query: () =>
                `/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc`,
        }),

        postRating: builder.mutation({
            query: ({ id, rating }) => ({
                url: `/movie/${id}/rating?api_key=${tmdbApiKey}`,
                method: 'POST',
                body: { value: rating },
            }),
        }),
        postFavorite: builder.mutation({
            query: ({ id, mediaType, mediaId, favorite }) => ({
                url: `/account/${id}/favorite?api_key=${tmdbApiKey}`,
                method: 'POST',
                body: {
                    media_type: mediaType,
                    media_id: mediaId,
                    favorite,
                },
            }),
        }),
    }),
})

export const {
    useGetMovieQuery,
    useLazyGetMovieQuery,
    useGetCreditsQuery,
    useGetSimilarMoviesQuery,
    useGetMovieListQuery,
    usePostRatingMutation,
    usePostFavoriteMutation,
} = tmdbApi
