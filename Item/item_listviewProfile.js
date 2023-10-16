import React, { Component,useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native';
import Item_listviewComment from '../Item/item_listviewComment';

function item_listviewProfile(props) {
    const [like, setLike] = useState(true);
    const [comment, setComment] = useState(false);
    const { dataProfile } = props;
    function clickLike() {
        if (like == true) {
            setLike(false)
        }
        else {
            setLike(true)
        }

    }
    function clickComment() {
        if (comment == false) {
            setComment(true)
        }
        else {
            setComment(false)
        }


    }
    const imgSource = like ? require('E:/React Native/Assignment/Img/heart_unlike.png') : require('E:/React Native/Assignment/Img/heart_like.png');

    return (

        <View style={styles.container}>
            <View style={styles.Viewname}>
                <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')}
                />
                <Text style={styles.textname}>{dataProfile.name}</Text>
            </View>
            <View>
                <Text style={styles.texttitle}>{dataProfile.title}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image style={styles.imgcontent} source={{ uri: dataProfile.image }}
                />
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={() => clickLike()}>
                    <Image
                        style={styles.imgicon}
                        source={imgSource}

                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clickComment()}>
                    <Image style={styles.imgicon} source={require('E:/React Native/Assignment/Img/comment.png')} />
                </TouchableOpacity >
                <TouchableOpacity>
                    <Image style={styles.imgicon} source={require('E:/React Native/Assignment/Img/share.png')} />
                </TouchableOpacity>
            </View>

            {comment && <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={styles.comment}>
                    <FlatList nestedScrollEnabled
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        data={dataItem_LVComment}
                        renderItem={({ item }) => <Item_listviewComment dataComment={item} />}
                        keyExtractor={item => item._id}
                    />
                    <View style={styles.styleComment}>
                        <TextInput placeholder='Bình luận' style={styles.TextComment} />
                    </View>

                </View>
            </View>}


        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexGrow: 1
    },
    imgavtar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 15,
        marginEnd: 20
    },
    imgcontent: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    imgicon: {
        width: 40,
        height: 40,
        marginTop: 5,
        marginLeft: 20,
        marginBottom: 10


    },
    Viewname: {
        flexDirection: 'row',
        marginTop: 10

    },
    textname: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 15
    },
    texttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 18,
        marginLeft: 20
    },
    comment: {
        flexGrow: 1,
        width: '90%',
        height: 250,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'scroll',
        zIndex: 99999,

    },
    styleComment: {
        width: "95%",
        height: 40,
        paddingStart: 10,
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        margin: 10


    },
    TextComment: {
        fontSize: 15,
    }

})
const dataItem_LVComment =
    [
        {
            "_id": "1",
            "name": "Putin",
            "title": "Hay quá bạn ơi",
            "createdAt": "2023-01-12T06:26:17.539Z",
            "createdBy": {
                "_id": "63ac39aeedf7c80016c57a67",
                "name": "",
                "avatar": ""

            }
        },
        {
            "_id": "2",

            "name": "Zelensky",
            "title": "Ok ok",
            "createdAt": "2023-01-12T06:26:17.539Z",
            "createdBy": {
                "_id": "63ac39aeedf7c80016c57a67",
                "name": "",
                "avatar": ""
            }
        },
        {
            "_id": "3",

            "name": "Obama",
            "title": "What's your name ?",
            "createdAt": "2023-01-12T06:26:17.539Z",
            "createdBy": {
                "_id": "63ac39aeedf7c80016c57a67",
                "name": "",
                "avatar": ""
            }
        },
        {
            "_id": "4",

            "name": "Trumb",
            "title": "Shut up!",
            "createdAt": "2023-01-12T06:26:17.539Z",
            "createdBy": {
                "_id": "63ac39aeedf7c80016c57a67",
                "name": "",
                "avatar": ""
            }
        },
    ]




export default item_listviewProfile;
