import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
    data: number[]
}

const TopCast = ({ data }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title='Top Rated'>
            <FlatList
                data={data}
                renderItem={({ item }) => <ActorCard width={width * 0.3} height={width * 0.3} realName={"Keanu Reeves"} characterName='John Wick' />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Wrapper>
    )
}

interface ActorCardProps {
    width: number,
    height: number,
    realName: string,
    characterName: string,
}

const ActorCard = ({ width, height, realName, characterName }: ActorCardProps) => {
    return (
        <TouchableWithoutFeedback className='m-2 items-center'>
            <View className='rounded-full border border-white overflow-hidden w-20 h-20' >
                <Image
                    source={require('../../assets/dummy/keanureeves.jpg')}
                    className='w-20 h-24'
                />
            </View>
            <Text className='text-white text-center mt-1'>{realName.length > 14 ? realName.slice(0, 14) + '...' : realName}</Text>
            <Text className='text-neutral-400 text-center'>{characterName.length > 14 ? characterName.slice(0, 14) + '...' : characterName}</Text>
        </TouchableWithoutFeedback>
    )
}

export default TopCast