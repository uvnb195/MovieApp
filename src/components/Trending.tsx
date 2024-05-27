import { View, Text, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import Wrapper from './Wrapper'
import Carousel from 'react-native-reanimated-carousel'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
    data: number[]
}

const Trending = (props: Props) => {
    const { width } = useWindowDimensions()
    return (
        <Wrapper title='Trending'>
            <View className='flex-row justify-center items-center'>
                <Carousel
                    data={[1, 2, 3, 4]}
                    renderItem={({ item }) =>
                        <MovieCard title={`Card ${item}`}
                            width={width}
                            height={width} />}
                    width={width}
                    height={width}
                    modeConfig={{
                        parallaxScrollingOffset: 170,
                        parallaxScrollingScale: 0.7,
                        parallaxAdjacentItemScale: 0.6
                    }}
                    mode='parallax'
                    style={{
                        alignSelf: 'center',
                        marginTop: -50,
                    }}
                />
            </View>
        </Wrapper>
    )
}

interface CardProps {
    title: string,
    width: number,
    height: number
}

const MovieCard = ({ title, width, height }: CardProps) => {
    return (
        <TouchableWithoutFeedback className=''>
            <Image source={require('../../assets/dummy/images.jpg')}
                style={{ width: '80%', height: '100%' }}
                className='rounded-2xl self-center' />
            {/* <Text>{title}</Text> */}
        </TouchableWithoutFeedback>
    )
}

export default Trending