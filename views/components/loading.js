import { Animated ,Easing} from 'react-native';
import React, { useRef } from 'react';
import Svg, {
    Circle,
} from 'react-native-svg';
import {
    NativeBaseProvider,
    Center
} from 'native-base';

export default function Loading() {
    const rotationRef = useRef(new Animated.Value(0)).current;
    Animated.loop(
        Animated.timing(rotationRef, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        })
    ).start();
    const rotation = rotationRef.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Animated.View
                    style={{transform: [{rotate: rotation}]}}
                >
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            margin: "auto",
                            background: "#f1f2f3",
                        }}
                        width={50}
                        height={50}
                        viewBox="0 0 100 100"
                    >
                        <Circle
                            cx={50}
                            cy={50}
                            fill="none"
                            stroke="#93dbe9"
                            strokeWidth={10}
                            r={35}
                            strokeDasharray="164.93361431346415 56.97787143782138"
                        >
                        </Circle>
                    </Svg>
                </Animated.View>
            </Center>
        </NativeBaseProvider>
    );
}
