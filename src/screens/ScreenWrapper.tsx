import { View, Text, Image, useWindowDimensions } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { HeartIcon } from 'react-native-heroicons/solid'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { theme } from '../theme'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Loading from '../components/Loading'

interface Props {
    className?: string,
    children: ReactNode,
    isLoading: boolean,
}

const ScreenWrapper = ({ className, children, isLoading }: Props) => {
    const [isFavourite, toggleFavourite] = useState(false)
    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className='absolute z-20 w-full p-2'>
                <StatusBar style='light' />

                {/* back button and bookmarks */}
                <View className='flex-row justify-between'>
                    <TouchableOpacity className='rounded-lg p-1' style={{ backgroundColor: theme.background }}>
                        <ChevronLeftIcon size={28} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon color={isFavourite ? 'red' : 'white'} size={32} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                isLoading
                    ? <Loading />
                    : <View className={'flex-1 ' + className}>
                        {children}
                    </View>
            }

        </View>
    )
}

export default ScreenWrapper