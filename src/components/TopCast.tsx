import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Cast } from '../api/movieCreditsType'
import { imageUrl } from '../api/axios'

interface Props {
    data: Cast[]
}

const TopCast = ({ data }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title='Top Cast'>
            <FlatList
                data={data}
                renderItem={({ item }) => <ActorCard width={width * 0.3} height={width * 0.3} data={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Wrapper>
    )
}

interface ActorCardProps {
    width: number,
    height: number,
    data: Cast
}

const ActorCard = ({ width, height, data }: ActorCardProps) => {
    const name = data.name
    const characterName = data.character
    return (
        <TouchableWithoutFeedback className='m-2 items-center'>
            <View className='rounded-full border border-white overflow-hidden w-20 h-20' >
                <Image
                    source={{ uri: imageUrl(data.profile_path || "", 185) }}
                    className='w-20 h-24'
                />
            </View>
            <Text className='text-white text-center mt-1'>{name.length > 14 ? name.slice(0, 14) + '...' : name}</Text>
            <Text className='text-neutral-400 text-center'>{characterName.length > 14 ? characterName.slice(0, 14) + '...' : characterName}</Text>
        </TouchableWithoutFeedback>
    )
}

export default TopCast