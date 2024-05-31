import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import Wrapper from '../components/Wrapper'
import Trending from '../components/Trending'
import Carousel from 'react-native-reanimated-carousel'
import Upcoming from '../components/Upcoming'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import Loading from '../components/Loading'
import { fetchTopratedMovie, fetchTrendingMovie, fetchUpcomingMovie } from '../api/axios'
import { Result, MovieListResponseType } from '../api/movieListType'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState<Result[]>([])
  const [upcoming, setUpcoming] = useState<Result[]>([])
  const [toprated, setToprated] = useState<Result[]>([])

  useEffect(() => {
    getTredingMovie()
    getUpcomingMovie()
    getTopratedMovie()
    setTimeout(() => setLoading(false), 500)
  }, [])

  const getTredingMovie = async () => {
    const data = await fetchTrendingMovie()
    if (data.results) {
      setTrending(data.results)
    }
  }
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie()
    if (data.results) {
      setUpcoming(data.results)
    }
  }
  const getTopratedMovie = async () => {
    const data = await fetchTopratedMovie()
    if (data.results) {
      setToprated(data.results)
    }
  }


  return (
    <View className='flex-1 bg-neutral-800'>

      {/* Search bar, menu icon and logo text */}
      <SafeAreaView className='mb-3'>
        <StatusBar style='light' />
        <View className='flex-row justify-between px-4 py-2'>
          <Bars3CenterLeftIcon color='white' size='30' />
          <Text className='text-2xl text-white font-bold'>
            <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} >
            <MagnifyingGlassIcon color={'white'} size={30} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ?
        <Loading />
        : <ScrollView>
          {/* Trending Movies */}
          <Trending data={trending} />
          <Upcoming title='Upcoming' data={upcoming} />
          <Upcoming title='Toprated' data={toprated} />

        </ScrollView>}
    </View>
  )
}

const Card = () => {
  return (
    <Text>Card</Text>
  )
}

export default Home