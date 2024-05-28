import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Result } from '../api/movieListType'
import { imageUrl } from '../api/axios'

interface Props {
    title: string,
    data: Result[]
}

const Upcoming = ({ title, data }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title={title} showSeeAll>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <MovieCard width={width * 0.3} height={width * 0.5} title={item.title} imageUrl={imageUrl(item.poster_path, 185)} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </Wrapper>
    )
}

export const MovieCard = ({ width, height, title, imageUrl, numberOfCharacters }:
    {
        width: number,
        height: number,
        title: string,
        imageUrl: string,
        numberOfCharacters?: number
    }) => {
    return (
        <TouchableWithoutFeedback>

            <View className='p-2 items-center'>
                <Image
                    source={{ uri: imageUrl }}
                    className='rounded-2xl'
                    style={{
                        width: width,
                        height: height
                    }}
                />
                <Text className='text-white'>{title && (title.length > (numberOfCharacters || 14) ? title.slice(0, numberOfCharacters || 14) + '...' : title)}</Text>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default Upcoming