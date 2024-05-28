import { View, Text, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import Carousel from 'react-native-reanimated-carousel'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Result } from '../api/movieListType'
import { imageUrl } from '../api/axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'

interface Props {
    data: Result[]
}

const Trending = ({ data }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title='Trending'>
            <View className='flex-row justify-center items-center'>
                <Carousel
                    data={data}
                    renderItem={({ item }) =>
                        <MovieCard url={imageUrl(item.poster_path, 342)} id={item.id} />}
                    width={width}
                    height={width}
                    modeConfig={{
                        parallaxScrollingOffset: 170,
                        parallaxScrollingScale: 0.7,
                        parallaxAdjacentItemScale: 0.6
                    }}
                    mode='parallax'
                    style={{
                        alignSelf: 'center',
                        marginTop: -50,
                    }}
                />
            </View>
        </Wrapper>
    )
}

interface CardProps {
    url: string,
    id: number
}

const MovieCard = ({ url, id }: CardProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    return (
        <TouchableWithoutFeedback className='' onPress={() => navigation.navigate('Movie', { id })}>
            <Image source={{ uri: url }}
                style={{
                    width: '75%', height: '100%',
                    resizeMode: 'stretch'
                }}
                className='rounded-2xl self-center' />
        </TouchableWithoutFeedback>
    )
}

export default Trending