import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function SignUp({ navigation, route }) {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');

    function SignIn() {
        navigation.navigate({
            name: 'SignIn'
        })

    }
    const changeScreen = async () => {
        try {
            const response = await fetch("https://6528c972931d71583df2736f.mockapi.io/account?GmailUser=" + gmail,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )

            if (response.status === 200) {
                const userData = await response.json();
                console.log("hom ", userData)

                if (userData.length === 1 && userData[0].Password === password) {
                    const idUser = userData[0].idUser;
                    const userRole = userData[0].role;
                    const userImg = userData[0].avatar;
                    const username = userData[0].NameUser;
                    
                    await AsyncStorage.setItem("id_user", idUser);
                    await AsyncStorage.setItem("name_user", username);
                    await AsyncStorage.setItem("user_role", userRole);
                    await AsyncStorage.setItem("user_img", userImg);
                    navigation.navigate("Tab_bottom");
                    ToastAndroid.show("Đăng nhập thành công", 2);
                } else {
                    ToastAndroid.show("Gmail hoặc mật khẩu không đúng1", 2);
                }
            } else {
                ToastAndroid.show("Gmail hoặc mật khẩu không đúng", 2);
            }
        } catch (error) {
            ToastAndroid.show("Có lỗi xảy ra", 2);
        }
    }



    return (


        <View>
            <ImageBackground source={require("E:/React Native/Assignment/Img/SignIn.jpg")} style={{ width: "100%", height: "110%" }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('E:/React Native/Assignment/Img/bg1.jpg')}
                        style={{
                            width: '90%',
                            height: 250,
                            margin: 20,
                            borderRadius: 10
                        }}
                    />
                    <Text style={{ fontSize: 25 }}>Chào Mừng Bạn Tới QBook </Text>
                    <Text style={{ fontSize: 25 }}>Đăng Nhập Và Trải Nghiệm  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TextInput style={styles.TextInput}
                        placeholder='Nhập Gmail'
                        onChangeText={(value) => setGmail(value)}
                        value={gmail}

                    />
                    <TextInput style={styles.TextInput}
                        placeholder='Nhập Password'
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />
                </View>


                <View style={{ alignItems: 'center' }}>
                    < TouchableOpacity onPress={() => changeScreen()}>
                        <View style={{ backgroundColor: '#6699FF', width: 250, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.Text}>
                    <Text style={styles.Text1}>Nếu bạn chưa có tài khoản ?</Text>
                    <Text style={styles.TextSignin} onPress={() => SignIn()} >Sign In</Text>
                </View>
                <View style={styles.Img}>

                    <Image
                        style={styles.Img_item}
                        source={require("E:/React Native/Assignment/Img/icon_insta-removebg-preview.png")}

                    />


                    <Image
                        style={styles.Img_item}
                        source={require("E:/React Native/Assignment/Img/icon_gg-removebg-preview.png")}

                    />

                    <Image
                        style={styles.Img_item}
                        source={require("E:/React Native/Assignment/Img/icon_zalo.png")}

                    />



                </View>
            </ImageBackground>
        </View>







    );
}
const styles = StyleSheet.create({

    TextInput: {
        borderRadius: 10,
        borderWidth: 2,
        width: 300,
        height: 40,
        marginTop: 30,
        paddingLeft: 10

    },
    Text: {
        flexDirection: 'row',
        marginLeft: 55


    },
    Text1: {
        marginTop: 20,
        fontSize: 15,
        marginLeft: 20
    },
    TextSignin: {
        marginTop: 20,
        marginLeft: 10,
        color: '#6699FF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    Img: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    Img_item: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        width: 80,
        height: 80,


    },

})


export default SignUp;
