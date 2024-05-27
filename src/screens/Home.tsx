import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
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

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const [loading, setLoading] = useState(false)

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
          <Trending data={[1, 2, 3, 4]} />
          <Upcoming title='Upcoming' data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
          <Upcoming title='Toprated' data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />

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