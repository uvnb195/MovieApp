import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { imageError } from '../constants'

const Personcard = ({ width, height, title, imageUrl, numberOfCharacters, onClick }:
    {
        width: number,
        height: number,
        title: string,
        imageUrl: string,
        numberOfCharacters?: number,
        onClick: () => void
    }) => {
    const [isImgValid, setIsImgValid] = useState(true)

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View className='p-2 items-center justify-around m-2 bg-neutral-700 rounded-2xl'
                style={{
                    width: width,
                    height: height
                }}>
                <Image
                    onError={() => setIsImgValid(false)}
                    source={isImgValid ? { uri: imageUrl } : imageError}
                    className='rounded-full'
                    style={{
                        width: width * 0.7,
                        height: width * 0.7
                    }}
                />
                <Text className='text-white'>{title && (title.length > (numberOfCharacters || 14) ? title.slice(0, numberOfCharacters || 14) + '...' : title)}</Text>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default Personcard