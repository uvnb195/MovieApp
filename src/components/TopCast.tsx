import { View, Text, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Cast } from '../api/movieCreditsType'
import { imageUrl } from '../api/axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { imageError } from '../constants'

interface Props {
    data: Cast[]
}

const TopCast = ({ data }: Props) => {
    const { width } = useWindowDimensions()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
    return (
        <Wrapper title='Top Cast'>
            <FlatList
                data={data}
                renderItem={({ item }) => <ActorCard
                    width={width * 0.3}
                    height={width * 0.3}
                    data={item}
                    onClick={() => navigation.push('Person', { id: item.id })} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </Wrapper>
    )
}

interface ActorCardProps {
    width: number,
    height: number,
    data: Cast,
    onClick: () => void
}

const ActorCard = ({ width, height, data, onClick }: ActorCardProps) => {
    const name = data.name
    const characterName = data.character
    const [isImgValid, setIsImgValid] = useState(true)

    return (
        <TouchableWithoutFeedback className='m-2 items-center' onPress={onClick}>
            <View className='rounded-full border border-white overflow-hidden w-20 h-20' >
                <Image
                    onError={() => setIsImgValid(false)}
                    source={isImgValid ? { uri: imageUrl(data.profile_path || "", 185) } : imageError}
                    className={'w-20 ' + (isImgValid ? 'h-24' : 'h-20 bg-neutral-600')}
                />
            </View>
            <Text className='text-white text-center mt-1'>{name.length > 14 ? name.slice(0, 14) + '...' : name}</Text>
            <Text className='text-neutral-400 text-center'>{characterName.length > 14 ? characterName.slice(0, 14) + '...' : characterName}</Text>
        </TouchableWithoutFeedback>
    )
}

export default TopCast