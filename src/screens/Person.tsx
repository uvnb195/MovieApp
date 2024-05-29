import { View, Text, useWindowDimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import Wrapper from '../components/Wrapper'
import Upcoming from '../components/Upcoming'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'
import { fetchPersonCredits, fetchPersonDetail, imageUrl } from '../api/axios'
import { PersonResponseType } from '../api/personDetailType'
import { Result } from '../api/movieListType'

type Props = NativeStackScreenProps<RootStackParams, 'Person'>

const Person = ({ route }: Props) => {

    const personId = route.params.id
    const { width, height } = useWindowDimensions()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<PersonResponseType>()
    const [personCredits, setPersonCredits] = useState<Result[]>([])

    useEffect(() => {
        getPersonDetail()
        getPersonCredits()
        setLoading(false)
    }, [])

    const getPersonDetail = async () => {
        const data = await fetchPersonDetail(personId)
        if (data) {
            setData(data)
        }
    }

    const getPersonCredits = async () => {
        const data = await fetchPersonCredits(personId)
        console.log('=========', data)
        if (data) {
            setPersonCredits(data.cast)
        }
    }

    return (
        <ScreenWrapper isLoading={loading}>
            <ScrollView>

                {/* image */}
                <View className='overflow-hidden rounded-full justify-center self-center border border-neutral-400 w-72 h-72'
                    style={{
                        marginTop: height * 0.1,
                        shadowColor: 'gray',
                        shadowOpacity: 1,
                        shadowRadius: 10,
                        shadowOffset: { width: 0, height: 5 },
                        elevation: 50
                    }}>
                    <Image
                        source={{ uri: imageUrl(data?.profile_path || "", 500) }}
                        style={{
                            width: width * 0.75,
                            height: height * 0.5
                        }}
                        className='self-center'
                    />
                </View>
                {/* person info */}
                <View className='w-full justify-center mt-6'>
                    <Text className='text-white font-bold text-3xl text-center'>{data?.name}</Text>
                    <Text className='text-neutral-500 text-base text-center'>{data?.place_of_birth}</Text>

                    {/* stats */}
                    <View className='my-6 bg-neutral-700 mx-2 rounded-full p-2 flex-row justify-around'>
                        <View className='border-r-2 border-neutral-400'>
                            <Stat
                                type={'Gender'}
                                data={data?.gender == 1 ? 'Female' : 'Male'} />
                        </View>
                        <View className='border-r-2 border-neutral-400  overflow-hidden'>
                            <Stat
                                type={'Birthday'}
                                data={'1964-09-02'} />
                        </View>
                        <View className='border-r-2 border-neutral-400 '>
                            <Stat
                                type={'Know for'}
                                data={data?.known_for_department + ""} />
                        </View>
                        <View className=''>
                            <Stat
                                type={'Popularity'}
                                data={data?.popularity + ""} />
                        </View>
                    </View>

                    {/* Biography */}
                    <Wrapper title='Biography'>
                        <Text className='text-justify leading-normal text-neutral-400 text-base'>
                            {data?.biography}
                        </Text>
                    </Wrapper>

                    <Upcoming title={' '} data={personCredits} />
                </View>
            </ScrollView>
        </ScreenWrapper>
    )
}

interface StatProps {
    type: string,
    data: string,
}
const Stat = ({ type, data }: StatProps) => {
    return (
        <View className={'flex-col justify-center px-2'}>
            <Text numberOfLines={1} className='text-white font-semibold text-base text-center'>{type}</Text>
            <Text numberOfLines={1} className='text-neutral-400 text-base text-center text-now'>{data}</Text>
        </View>
    )
}

export default Person