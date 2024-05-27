import { View, Text, useWindowDimensions, Image } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './ScreenWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import Wrapper from '../components/Wrapper'
import Upcoming from '../components/Upcoming'

const Person = () => {
    const { width, height } = useWindowDimensions()
    const [loading, setLoading] = useState(false)

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
                        source={require('../../assets/dummy/keanureeves.jpg')}
                        style={{
                            width: width * 0.75,
                            height: height * 0.5
                        }}
                        className='self-center'
                    />
                </View>
                {/* person info */}
                <View className='w-full justify-center mt-6'>
                    <Text className='text-white font-bold text-3xl text-center'>Keanu Reeves</Text>
                    <Text className='text-neutral-500 text-base text-center'>Lodon, United Kingdom</Text>

                    {/* stats */}
                    <View className='my-6 bg-neutral-700 mx-2 rounded-full p-2 flex-row justify-around'>
                        <View className='border-r-2 border-neutral-400'>
                            <Stat
                                type={'Gender'}
                                data={'Male'} />
                        </View>
                        <View className='border-r-2 border-neutral-400  overflow-hidden'>
                            <Stat
                                type={'Birthday'}
                                data={'1964-09-02'} />
                        </View>
                        <View className='border-r-2 border-neutral-400 '>
                            <Stat
                                type={'Know for'}
                                data={'Acting'} />
                        </View>
                        <View className=''>
                            <Stat
                                type={'Popularity'}
                                data={'64.23'} />
                        </View>
                    </View>

                    {/* Biography */}
                    <Wrapper title='Biography'>
                        <Text className='text-justify leading-normal text-neutral-400 text-base'>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        </Text>
                    </Wrapper>

                    <Upcoming title={' '} data={[1, 2, 3, 4, 5, 6]} />
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