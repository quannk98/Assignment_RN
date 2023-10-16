import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


function item_listviewComment(props) {
    const { dataComment } = props;

    return (
        <View style={styles.container}>
            <View style={styles.Viewname}>
                <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')}
                />
                <View style={styles.Viewcomment}>
                    <Text style={styles.textname}>{dataComment.name}</Text>
                    <Text style ={styles.texttitle}>{dataComment.title}</Text>
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10
    },
    imgavtar: {
        width: 35,
        height: 35,
        borderRadius: 60,
        marginStart: 10,
        marginEnd: 10,
        marginBottom: 10
    },

    Viewname: {
        flexDirection: 'row',
        marginTop: 10

    },
    Viewcomment:{
        backgroundColor:'#DDDDDD',
        paddingStart:10,
        borderRadius:10,
        width:'80%',

    },
    textname: {
        fontSize: 18,
        fontWeight: 'bold',


    },
    texttitle: {
        fontSize: 15,
        marginTop: 5,
        marginBottom:5

    },


})


export default item_listviewComment;
