import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ChevronDownIcon, ChevronLeftIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MovieCard } from '../components/Upcoming'
import Loading from '../components/Loading'
import { useDebounce } from '../constants/hooks'
import { fetchSearchMovie, fetchSearchPerson, imageUrl } from '../api/axios'
import { Result as Movie } from '../api/movieListType'
import { Result as Person } from '../api/personListType'
import { theme } from '../theme'
import Personcard from '../components/Personcard'

const Search = () => {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [input, setInput] = useState('')
    const searchDebounce = useDebounce(input)
    const [movies, setMovies] = useState<Movie[]>([])
    const [persons, setPersons] = useState<Person[]>([])
    const [loading, setLoading] = useState(false)
    const [showMovies, toggleMovies] = useState(false)
    const [showPersons, togglePersons] = useState(false)

    const handleInput = (value: string) => {
        setInput(value)
    }

    useEffect(() => {
        if (searchDebounce.length > 2) {
            setLoading(true)
            getSearchResults(searchDebounce)
            setTimeout(() => setLoading(false), 1000)
        }
    }, [searchDebounce])

    const getSearchResults = async (value: string) => {
        const moviesData = await fetchSearchMovie(value)
        const personsData = await fetchSearchPerson(value)
        if (moviesData.total_results > 0) {
            setMovies(moviesData.results)
        }
        if (personsData.total_results > 0) {
            setPersons(personsData.results)
        }
    }

    const handleClear = () => {
        if (input.length > 0) {
            setInput('')
            setMovies([])
        }
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
                        placeholder='Search Movie or Person...'
                        placeholderTextColor={'darkgray'}
                        className='text-base text-white mx-4 h-10 flex-1'
                        value={input}
                        onChangeText={handleInput}
                    />
                    <TouchableOpacity className='border-2 border-neutral-500 rounded-full h-10 w-10 justify-center items-center'
                        onPress={handleClear}>
                        <XMarkIcon color={'lightgray'} size={32} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading && <Loading />}
            {!loading && (movies.length > 0
                ?
                <View className='flex-1 px-0 pb-6 overflow-visible' >
                    {/* movies result */}
                    <View className='flex-row justify-between items-center pr-4 border-b border-neutral-500'>
                        <Text className='text-neutral-400 mx-2 my-1'>Movies ({movies.length})</Text>
                        <TouchableOpacity
                            onPress={() => toggleMovies(!showMovies)}
                            className='bg-neutral-700 rounded items-center justify-center p-[1px]'>
                            {showMovies ?
                                <ChevronLeftIcon color={theme.background} size={20} />
                                : <ChevronDownIcon color={theme.background} size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        showMovies && <View className='flex-row justify-center flex-auto'>
                            <FlatList
                                data={movies}
                                renderItem={({ item }) =>
                                    <MovieCard
                                        key={item.id}
                                        width={width * 0.4}
                                        height={width * 0.5}
                                        title={item.title}
                                        numberOfCharacters={21}
                                        imageUrl={imageUrl(item.poster_path, 342)}
                                        onClick={function (): void {
                                            throw new Error('Function not implemented.')
                                        }} />}
                                numColumns={2}
                                contentContainerStyle={{
                                    alignItems: 'center'
                                }}
                            />
                        </View>
                    }
                    {/* persons result */}
                    <View className='flex-row justify-between items-center pr-4 border-b border-neutral-500'>
                        <Text className='text-neutral-400 mx-2 my-1'>Persons ({movies.length})</Text>
                        <TouchableOpacity
                            onPress={() => togglePersons(!showPersons)}
                            className='bg-neutral-700 rounded items-center justify-center p-[1px]'>
                            {showPersons ?
                                <ChevronLeftIcon color={theme.background} size={20} />
                                : <ChevronDownIcon color={theme.background} size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        showPersons && <View className='flex-row justify-center flex-auto'>
                            <FlatList
                                data={persons}
                                renderItem={({ item }) =>
                                    <Personcard
                                        key={item.id}
                                        width={width * 0.4}
                                        height={width * 0.5}
                                        title={item.name}
                                        numberOfCharacters={21}
                                        imageUrl={imageUrl(item.profile_path || '', 342)}
                                        onClick={function (): void {
                                            throw new Error('Function not implemented.')
                                        }} />}
                                numColumns={2}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            />
                        </View>
                    }

                </View>
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