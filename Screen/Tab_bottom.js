import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Friends from './Friends';
import Notifile_follow from './Notifile_follow';
import Post_news from './Post_news';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
const CustomeTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{

            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>

    </TouchableOpacity>
)
const Stack = createNativeStackNavigator();

function NewsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="News_Stack" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function FriendsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Friends_Stack" component={Friends} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function PostStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Post_Stack" component={Post_news} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function NotifileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Notifile_Stack" component={Notifile_follow} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile_Stack" component={Profile} options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function Tab_bottom() {

    return (
        <Tab.Navigator
            screenOptions={{

                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',

                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen
                name="News"
                component={NewsStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_news.png')}
                                resizeMode="contain"
                                style={{
                                    marginLeft: 4,
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                                NEWS
                            </Text>

                        </View>
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Friends"
                component={FriendsStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_friends.png')}
                                resizeMode="contain"
                                style={{
                                    marginLeft: 10,
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                                FRIENDS
                            </Text>

                        </View>

                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Post"
                component={PostStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('E:/React Native/Assignment/Img/icon_post.png')}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: '#fff',
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomeTabBarButton{...props} />
                    ),
                    headerShown: false,

                }}
            />
            <Tab.Screen
                name="Notifile"
                component={NotifileStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_notifile.png')}
                                resizeMode="contain"
                                style={{
                                    marginLeft: 12,
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                                NOTIFILE
                            </Text>

                        </View>
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_profile.png')}
                                resizeMode="contain"
                                style={{
                                    marginLeft: 10,
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>
                                PROFILE
                            </Text>

                        </View>
                    ),
                    headerShown: false,
                }} /> 
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})


export default Tab_bottom;
