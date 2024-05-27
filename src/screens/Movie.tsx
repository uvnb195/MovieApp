import { View, Text, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import ScreenWrapper from './ScreenWrapper'
import { LinearGradient } from 'expo-linear-gradient'
import Upcoming from '../components/Upcoming'
import TopCast from '../components/TopCast'

const Movie = () => {
    const { width: deviceWidth, height: deviceHeight } = useWindowDimensions()
    const [loading, setLoading] = useState(false)
    return (
        <ScreenWrapper isLoading={loading}>
            <View className='flex-1 absolute top-0 bottom-0'>
                <Image source={require('../../assets/dummy/avatar2.jpg')}
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
                        <Text className='text-white text-2xl font-bold text-center'>Avatar 2: The Way of Water</Text>
                        {/* Stats */}
                        <Text className='text-neutral-400 text-base text-center'>Released • 2024 • 240 min</Text>
                        <Text className='text-neutral-400 text-base text-center'>Science Fiction • Adventure • Action</Text>

                        {/* Overview */}
                        <Text className='text-neutral-400 tracking-wide text-justify leading-relaxed'>
                            Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.
                        </Text>
                    </View>
                    {/* Top rated */}
                    <TopCast data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                    <Upcoming title='Similar Movies' data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />

                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

export default Movie