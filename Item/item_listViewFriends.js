import React, { useState, useEffect, FlatList } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";

function ItemListViewFriends(props) {
    const [datafriend, setDatadfriend] = useState([]);
    const [iduser, setIduser] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const { dataFLN } = props;


   



    useEffect(() => {

        if (iduser && datafriend) {
            const userFollowing = datafriend.find((user) => user.idUser === iduser);

            if (userFollowing) {
                setIsFollowing(userFollowing.list_follow.includes(dataFLN.idUser));
            }
        }
    }, [iduser, datafriend, dataFLN.idUser]);

    const FollowClick = async () => {
        const ID = await AsyncStorage.getItem("id_user");

        if (ID) {
            setIduser(ID);

        }
        const response = await axios.get(ACCOUNT_API);
        setDatadfriend(response.data);

        try {
            
            const userFollowing = datafriend.find((user) => user.idUser === iduser);
            const userToFollow = datafriend.find((user) => user.idUser === dataFLN.idUser);


            if (userToFollow && userFollowing) {
                let updatedFollowingList = [...userFollowing.list_follow];

                if (isFollowing) {
                    // Unfollow
                    const index = updatedFollowingList.indexOf(userToFollow.idUser);
                    if (index !== -1) {
                        updatedFollowingList.splice(index, 1);
                    }
                    // updatedListFollow = updatedListFollow.filter((userId) => userId !== iduser);
                } else {
                    // Follow

                    updatedFollowingList = [...updatedFollowingList, userToFollow.idUser];

                    // updatedListFollow.push(dataFLN.idUser);

                }

                const response1 = await axios.put(`${ACCOUNT_API}/${userFollowing.idUser}`, {
                    list_follow: updatedFollowingList,
                });

                if (response1.status === 200) {
                    const updatedDatafriend = datafriend.map((user) => {
                        if (user.idUser === userFollowing.idUser) {
                            return {
                                ...user,
                                list_follow: updatedFollowingList,
                            };
                        }
                        return user;
                    });
                    setDatadfriend(updatedDatafriend);

                    setIsFollowing(!isFollowing);

                } else {
                    console.log("Lỗi cập nhật follow");
                }
            }
        } catch (error) {
            console.error("Lỗi ", error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.Viewname}>
                <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')} />
                <Text style={styles.textname}>{dataFLN.NameUser}</Text>
            </View>

            {isFollowing ? (
                <TouchableOpacity style={{ marginTop: 20, marginStart: 90 }} onPress={() => FollowClick()}>
                    <View style={{ backgroundColor: 'white', width: 100, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Shrikhand-Regular-SVG' }}>Unfollow</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={{ marginTop: 20, marginStart: 90 }} onPress={() => FollowClick()}>
                    <View style={{ backgroundColor: 'black', width: 100, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white', fontFamily: 'Shrikhand-Regular-SVG' }}>Follow</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        margin: 10,
        borderRadius: 20,
        flexDirection: 'row',
    },
    imgavtar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 10
    },
    Viewname: {
        flexDirection: 'row',
        marginTop: 10,
        width: '45%'
    },
    textname: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
    },
});

export default ItemListViewFriends;
