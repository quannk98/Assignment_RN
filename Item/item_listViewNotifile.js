import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function item_listViewNotifile(props) {
    const { dataNLV } = props
    console.log("data ne",dataNLV)

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.stylepost}>
                    <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')} />
                    <Text style={styles.textname}>{dataNLV}</Text>
                    <Text style={{ fontSize: 18, marginTop: 18 }}>đã đăng 1 bài mới</Text>
                </View>
            </TouchableOpacity>
         



        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginStart: 20
    },
    imgavtar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 10
    },
    stylepost: {
        backgroundColor: 'white',
        width: '90%',
        height: 80,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        paddingTop: 5,
        paddingLeft: 10,
        marginTop: 20,

    },
    textname: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 18
    }

})


export default item_listViewNotifile;
