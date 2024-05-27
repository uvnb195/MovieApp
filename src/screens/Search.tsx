import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MovieCard } from '../components/Upcoming'
import Loading from '../components/Loading'

const Search = () => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [input, setInput] = useState('')
    const [result, setResult] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleClear = () => {
        if (input.length > 0) setInput('')
        else navigation.goBack()
    }
    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView>
                <StatusBar style='light' />
                {/* Search input */}
                <View className='rounded-full bg-neutral-700 p-1 justify-between flex-row items-center mx-2 my-1'>
                    <TextInput
                        numberOfLines={1}
                        placeholder='Search...'
                        placeholderTextColor={'darkgray'}
                        className='text-base text-white mx-4 h-10 flex-1'
                        value={input}
                        onChangeText={(value) => setInput(value)}
                    />
                    <TouchableOpacity className='border-2 border-neutral-500 rounded-full h-10 w-10 justify-center items-center'
                        onPress={handleClear}>
                        <XMarkIcon color={'lightgray'} size={32} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading && <Loading />}
            {!loading && (result > 0
                ? <ScrollView>
                    <View className='mx-2 my-2'>
                        {/* total result */}
                        <Text className='text-neutral-400 mx-2'>Result ({result})</Text>
                        <View className='flex-row flex-wrap justify-evenly'>
                            <MovieCard
                                width={width * 0.4}
                                height={width * 0.5}
                                title={'Avatar 2: The way of Water'}
                                numberOfCharacters={21} />
                            <MovieCard
                                width={width * 0.4}
                                height={width * 0.5}
                                title={'Avatar 2: The way of Water'}
                                numberOfCharacters={21} />
                            <MovieCard
                                width={width * 0.4}
                                height={width * 0.5}
                                title={'Avatar 2: The way of Water'}
                                numberOfCharacters={21} />
                            <MovieCard
                                width={width * 0.4}
                                height={width * 0.5}
                                title={'Avatar 2: The way of Water'}
                                numberOfCharacters={21} />
                        </View>
                    </View>
                </ScrollView>
                : <Image
                    source={require('../../assets/dummy/search-bg.webp')}
                    style={{
                        width: width,
                        height: height * 0.4,
                        resizeMode: 'contain',
                        opacity: 0.7
                    }}
                />
            )}
        </View>
    )
}

export default Search