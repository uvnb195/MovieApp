import { View, Text, FlatList, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
    title: string,
    data: number[]
}

const Upcoming = ({ title, data }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title={title} showSeeAll>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <MovieCard width={width * 0.3} height={width * 0.5} title='Avatar 2: The last bended' />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </Wrapper>
    )
}

export const MovieCard = ({ width, height, title, numberOfCharacters }:
    {
        width: number,
        height: number,
        title: string,
        numberOfCharacters?: number
    }) => {
    return (
        <TouchableWithoutFeedback>

            <View className='p-2'>
                <Image
                    source={require('../../assets/dummy/avatar2.jpg')}
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