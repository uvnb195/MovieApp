import axios from "axios";
import { apiKey } from "../constants";
import { MovieListResponseType } from "./movieListType";
import { MovieDetailResponseType } from "./movieDetailType";
import { MovieCreditsResponseType } from "./movieCreditsType";
import { PersonResponseType } from "./personDetailType";
import { PersonCreditsResponseType } from "./personCreditsType";

const baseURL = 'https://api.themoviedb.org/3'

// instance
const tmdbInstance = axios.create({
    baseURL: baseURL,
    timeout: 2000,
})

// endpoint 
const trendingMovieEndpoint = `/trending/movie/day?api_key=${apiKey}`
const upcomingMovieEndpoint = `/movie/upcoming?api_key=${apiKey}`
const topratedMovieEndpoint = `/movie/top_rated?api_key=${apiKey}`
const movieDetailEndpoint = (id: number) => `/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = (id: number) => `/movie/${id}/credits?api_key=${apiKey}`
const similarMovieEndpoint = (id: number) => `/movie/${id}/similar?api_key=${apiKey}`
const personDetailEndpoint = (id: number) => `/person/${id}?api_key=${apiKey}`
const personCreditsEndpoint = (id: number) => `/person/${id}/movie_credits?api_key=${apiKey}`

// image url

export const imageUrl = (path: string, size: 500 | 342 | 185) => (`https://image.tmdb.org/t/p/w${size}` + path)

// fetch data
export const fetchTrendingMovie = async () => {
    const response = await tmdbInstance.get(trendingMovieEndpoint)
    return response.data as MovieListResponseType
}

export const fetchUpcomingMovie = async () => {
    const response = await tmdbInstance.get(upcomingMovieEndpoint)
    return response.data as MovieListResponseType

}

export const fetchTopratedMovie = async () => {
    const response = await tmdbInstance.get(topratedMovieEndpoint)
    return response.data as MovieListResponseType
}

export const fetchMovieDetail = async (id: number) => {
    const response = await tmdbInstance.get(movieDetailEndpoint(id))
    return response.data as MovieDetailResponseType
}

export const fetchMovieCredits = async (id: number) => {
    const response = await tmdbInstance.get(movieCreditsEndpoint(id))
    return response.data as MovieCreditsResponseType
}

export const fetchSimilarMovie = async (id: number) => {
    const response = await tmdbInstance.get(similarMovieEndpoint(id))
    return response.data as MovieListResponseType
}

export const fetchPersonDetail = async (id: number) => {
    const response = await tmdbInstance.get(personDetailEndpoint(id))
    return response.data as PersonResponseType
}

export const fetchPersonCredits = async (id: number) => {
    const response = await tmdbInstance.get(personCreditsEndpoint(id))
    return response.data as PersonCreditsResponseType
}