import { View, Text, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import ScreenWrapper from './ScreenWrapper'
import { LinearGradient } from 'expo-linear-gradient'
import Upcoming from '../components/Upcoming'
import TopCast from '../components/TopCast'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { fetchMovieCredits, fetchMovieDetail, fetchSimilarMovie, imageUrl } from '../api/axios'
import { MovieDetailResponseType } from '../api/movieDetailType'
import { Cast, MovieCreditsResponseType } from '../api/movieCreditsType'
import { MovieListResponseType, Result } from '../api/movieListType'

type Props = NativeStackScreenProps<RootStackParams, 'Movie'>

const Movie = ({ route }: Props) => {
    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions()
    const [loading, setLoading] = useState(true)
    const [movieData, setMovieData] = useState<MovieDetailResponseType>()
    const [topcast, setTopcast] = useState<Cast[]>([])
    const [similarMovies, setSimilarMovies] = useState<Result[]>([])

    const movieId = route.params.id

    useEffect(() => {
        if (!loading) setLoading(true)
        getMovieDetail()
        getTopcast()
        getSimilarMovies()
        setLoading(false)
    }, [])

    const getMovieDetail = async () => {
        const data = await fetchMovieDetail(movieId)
        if (data) {
            setMovieData(data)
        }
    }

    const getTopcast = async () => {
        const data = await fetchMovieCredits(movieId)
        if (data) {
            setTopcast(data.cast)
        }
    }

    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovie(movieId)
        if (data) {
            setSimilarMovies(data.results)
        }
    }

    return (
        <ScreenWrapper isLoading={loading}>
            <View className='flex-1 absolute top-0 bottom-0'>
                <Image source={{ uri: imageUrl(movieData?.poster_path || '', 500) }}
                    style={{
                        width: deviceWidth,
                        height: deviceHeight * 0.5,
                        resizeMode: 'cover',

                    }} />
                <LinearGradient
                    colors={['transparent', 'rgba(38,38,38,1)', 'rgba(23,23,23,1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    className='absolute bottom-0'
                    style={{ width: deviceWidth, height: deviceHeight }} />
            </View>
            <ScrollView>
                <View
                    style={{ marginTop: deviceHeight * 0.45 }}
                    className='space-y-4 justify-center'>
                    <View className='px-4 space-y-3'>

                        {/* Title */}
                        <Text className='text-white text-2xl font-bold text-center'>{movieData?.original_title}</Text>
                        {/* Stats */}
                        <Text className='text-neutral-400 text-base text-center'>{movieData?.status} • {movieData?.release_date.split('-')[0]} • {movieData?.runtime} min</Text>
                        {/* genres */}
                        <View className='flex-row justify-center'>
                            {
                                movieData?.genres.map((value, index) => <Text key={index} className='text-neutral-400 text-base text-center'>{value.name}{index == movieData.genres.length - 1 ? '' : ' • '}</Text>)
                            }
                        </View>
                        {/* Overview */}
                        <Text className='text-neutral-400 tracking-wide text-justify leading-relaxed mb-4'>
                            {movieData?.overview}
                        </Text>
                    </View>
                    {/* Top rated */}
                    <TopCast data={topcast} />
                    <View className='h-2' />
                    <Upcoming title='Similar Movies' data={similarMovies} />

                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Movie