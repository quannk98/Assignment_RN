import React, { Component } from 'react';
import { View, Text, StyleSheet, style, Image, TouchableOpacity, LinearGradient } from 'react-native';

function item_listviewStory(props) {
    const { dataLN } = props;

    return (
        <View style={styles.container}>
{/* 
            <View style={styles.Viewname}>



                <TouchableOpacity>
                    <View style={styles.boderimage}>
                        <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')}
                        />
                    </View>
                </TouchableOpacity>


            </View>



            <Text style={styles.textname}>{dataLN.NameUser}</Text> */}


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        margin: 10,
        borderRadius: 20,
        alignItems: 'center'
    },

    imgavtar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 10,

    },
    boderimage: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginStart: 10,
        marginEnd: 20,
        paddingStart: 12,
        paddingTop: 7,
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center'

    },


    Viewname: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginStart: 10,
        width: 'auto',


    },
    textname: {
        fontSize: 18,

        width: 'auto'



    },


})


export default item_listviewStory;
