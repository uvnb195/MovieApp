import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { theme } from '../theme'

interface Props {
    title?: string,
    showSeeAll?: boolean,
    children: ReactNode
}

const Wrapper = (props: Props) => {
    const { title, showSeeAll, children } = props
    return (
        <View className='px-2 py-1 gap-1'>
            <View className='flex-row justify-between'>
                {title &&
                    <Text className='text-xl text-white'>{title}</Text>}
                {showSeeAll &&
                    <TouchableOpacity>
                        <Text style={{ color: theme.text }} className='text-xl opacity-70'>See all</Text>
                    </TouchableOpacity>}
            </View>
            {children}
        </View>
    )!
}

export default Wrapper