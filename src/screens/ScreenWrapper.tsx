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
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'

interface Props {
    className?: string,
    children: ReactNode,
    isLoading: boolean,
}

const ScreenWrapper = ({ className, children, isLoading }: Props) => {
    const [isFavourite, toggleFavourite] = useState(false)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    return (
        <View className='flex-1 bg-neutral-800'>
            <LinearGradient
                colors={['rgba(38,38,38,0.5)', 'rgba(38,38,38,0)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0, y: 1 }}
                className='absolute z-10 w-full h-10' />
            <SafeAreaView className='absolute z-20 w-full p-2'>
                <StatusBar style='light' />

                {/* back button and bookmarks */}
                <View className='flex-row justify-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        onLongPress={() => navigation.popToTop()}
                        className='rounded-lg p-1'
                        style={{ backgroundColor: theme.background, elevation: 10 }}>
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