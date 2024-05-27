import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native'
import React from 'react'
import { CircleSnail } from 'react-native-progress'
import { theme } from '../theme'

const Loading = () => {
    return (
        <View className='flex-1 justify-center items-center'>
            <CircleSnail size={80} color={theme.background} thickness={5} />
        </View>
    )
}

export default Loading