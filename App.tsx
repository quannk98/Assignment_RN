/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import Profile from './Screen/Profile';
import WellcomeScreen from './Screen/WellcomeScreen';
import Tab_bottom from './Screen/Tab_bottom';
import Friends from './Screen/Friends';
import Notifile_follow from './Screen/Notifile_follow';
import Post_news from './Screen/Post_news';
import SignUp from './Screen/SignUp';
import SignIn from './Screen//SignIn';
import UpdatePost from './Screen/UpdatePost';
import UpdateProfile from './Screen/UpdateProfile';

const Stack = createNativeStackNavigator();



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name='WellcomeScreen'
          component={WellcomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Tab_bottom'
          component={Tab_bottom}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Post'
          component={Post_news}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Friends'
          component={Friends}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Notifile'
          component={Notifile_follow}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{headerShown:false}}
        />
         <Stack.Screen
          name='Update'
          component={UpdatePost}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='UpdateProfile'
          component={UpdateProfile}
          options={{headerShown:false}}
        />

      </Stack.Navigator>


    </NavigationContainer>


  );
}



export default App;
