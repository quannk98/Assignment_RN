import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, Button, button, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';


function WellcomeScreen({ navigation, route }) {
    const [showButton, setShowButton] = useState(false);
    const [showText, setText] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShowButton(true)
            setText(false)
        }, 4000
        )
    })
    function changeScreen() {
        navigation.navigate({
            name: 'SignUp'
        })
    }
    



    return (
        <View  >
            <ImageBackground source={require("E:/React Native/Assignment/Img/Wellcome.jpg")} style={{ width: "100%", height: "100%" }}>
                <View style={{ alignItems: 'center', marginTop: '140%' }}>
                    {showText && <Text style={{ fontSize: 30, color: 'white' }}>Wellcome To QBook</Text>}
                    {showButton && <LinearGradient
                        colors={['#FF9966', '#CC99FF']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        style={styles.grediant}
                    >
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => changeScreen()}>
                            <Text style={styles.buttonText}>
                                START
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>}
                </View>
            </ImageBackground>

        </View>
    );
}
const styles = StyleSheet.create({
    grediant: {
        height: 44,
        width: 200,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonContainer: {
        flex: 1.0,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: '99%',
        margin: 1,
        borderWidth: 5,
        borderRadius: 10

    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        alignSelf: 'center',
        fontFamily: 'Shrikhand-Regular-SVG'
    }
})


export default WellcomeScreen;
