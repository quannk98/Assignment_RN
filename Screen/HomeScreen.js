import React, { Component, useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    Share,
    Alert,
    ToastAndroid

} from 'react-native';
import Item_listViewNews from '../Item/Item_listViewNews';
import Item_listviewStory from '../Item/item_listviewStory';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Item_listviewComment from '../Item/item_listviewComment';






const POST_API = "https://6528c972931d71583df2736f.mockapi.io/Post_news";
function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [PostList, setPostList] = useState([]);
    const [idUser, setIdUser] = useState("");
    const [check,setCheck] = useState(false)

    useEffect(() => {
        const CloneData = async () => {
            try {
                const userID = await AsyncStorage.getItem("id_user");
                if (userID) {
                    setIdUser(userID);
                }
                const response = await axios.get(POST_API);
                setData(response.data);

            }
            catch (error) {
                console.error("Lỗi 1 " + error)
            }
        }
        CloneData();
        const interval = setInterval(() => {
            CloneData();
        }, 10000);

        return () => clearInterval(interval);

    }, [])


    const togglelike = async (postId) => {
        const userlike = data.find((user) => user.idPost === postId);

        if (userlike) {
            const isLike = userlike.list_like.includes(idUser);
            const updatedListLike = isLike
                ? userlike.list_like.filter((id) => id !== idUser)
                : [...userlike.list_like, idUser];

            try {
                const response = await axios.put(
                    `${POST_API}/${postId}`,
                    {
                        list_like: updatedListLike,
                    }
                );

                if (response.status === 200) {
                    // Cập nhật trạng thái và văn bản của nút theo kết quả kiểm tra
                    const updatedLikeList = data.map((user) => {
                        if (user.idPost === postId) {
                            return {
                                ...user,
                                isLike: !isLike,
                                list_like: updatedListLike,
                            };
                        }
                        return user;
                    });

                    setData(updatedLikeList);
                } else {
                    console.error("Lỗi a khi cập nhật danh sách theo dõi");
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật danh sách theo dõi: ", error);
            }
        }
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "Share on facebook",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    const delete_post = async (postId, userid) => {
        if (userid === idUser) {

            Alert.alert(
                'Xác nhận xóa',
                'Bạn có chắc chắn muốn xóa bài đăng này?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xóa',
                        onPress: async () => {
                            const postToDelete = data.find((post) => post.idPost === postId);

                            if (!postToDelete) {
                                console.error('Bài đăng không tồn tại.');
                                return;
                            }

                            try {
                                const response = await axios.delete(`${POST_API}/${postId}`);

                                if (response.status === 200) {
                                    const updatedPosts = data.filter((post) => post.idPost !== postId);
                                    setData(updatedPosts);
                                    ToastAndroid.show('Đã xóa bài đăng', 3);
                                } else {
                                    console.error('Lỗi khi xóa bài đăng');
                                }
                            } catch (error) {
                                console.error('Lỗi khi xóa bài đăng: ', error);
                            }
                        },
                    },
                ]
            );
        } else {
            ToastAndroid.show('Bạn không thể xóa bài đăng này!', 3);
        }
    };
    const edit_post = async (postId, userid) => {
        if (userid === idUser) {
            navigation.navigate("Update", { id: postId });
            console.log("idid " + postId)
        }
        else {
            ToastAndroid.show("Bạn không thể sửa bài đăng này!", 3)
        }

    }
    const checkcomment = () => {
        if (check === true) {
            setCheck(false)
        }
        else {
            setCheck(true)
        }
    }



    return (

        <View>
            <LinearGradient
                colors={['#CC99FF', '#33CCFF', '#FF6699']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 15, fontFamily: 'Shrikhand-Regular-SVG' }}
            >
                <Text style={{ fontFamily: 'Shrikhand-Regular-SVG', fontSize: 25, color: 'white' }}>
                    QBOOK
                </Text>

            </LinearGradient>

            <View style={{ width: "100% ", height: 140 }}>
                <FlatList
                    data={data}
                    horizontal={true}
                    renderItem={({ item: datastory }) => {
                        return (
                            <View style={styles.container1}>
                                <View style={styles.Viewname1}>

                                    <TouchableOpacity>
                                        <View style={styles.boderimage1}>
                                            <Image style={styles.imgavtar1} source={{ uri: datastory.imgPost }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.textname1}>{datastory.NameUser}</Text>
                            </View>
                        )
                    }}
                />

            </View>
            <View style={{ width: '100%', height: 550 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.idPost.toString()}
                    renderItem={({ item: datapost }) => {
                        const array = data.find((user) => user.idPost === datapost.idPost)
                        const isLike = array.list_like.includes(idUser);

                        return (

                            <View style={styles.container}>
                                <View style={styles.Viewname}>
                                    <Image style={styles.imgavtar} source={{ uri: datapost.imgUser }}
                                    />
                                    <Text style={styles.textname}>{datapost.NameUser}</Text>
                                    <TouchableOpacity style={{ marginStart: 130, marginTop: 5 }} onPress={() => edit_post(datapost.idPost, datapost.idUser)}>
                                        <Image source={require('E:/React Native/Assignment/Img/edit.jpg')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginTop: 5 }} onPress={() => delete_post(datapost.idPost, datapost.idUser)}>
                                        <Image source={require('E:/React Native/Assignment/Img/delete.png')} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.texttitle}>{datapost.Content}</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={styles.imgcontent} source={{ uri: datapost.imgPost }}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ flex: 1, marginStart: 30 }}>
                                        {array.list_like.length} Like
                                    </Text>
                                    <Text style={{ flex: 1 }}>
                                        Comment
                                    </Text>
                                    <Text style={{ flex: 1 }}>
                                        Share
                                    </Text>

                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => togglelike(datapost.idPost)}  >
                                        <Image
                                            style={styles.imgicon}
                                            source={isLike ? require('E:/React Native/Assignment/Img/heart_like.png') : require('E:/React Native/Assignment/Img/heart_unlike.png')}
                                        />
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ marginLeft: 70 }} onPress={() => checkcomment()}>
                                        <Image style={styles.imgicon} source={require('E:/React Native/Assignment/Img/comment.png')} />
                                    </TouchableOpacity >
                                    <TouchableOpacity onPress={onShare} style={{ marginLeft: 50 }}>
                                        <Image style={styles.imgicon} source={require('E:/React Native/Assignment/Img/share.png')} />
                                    </TouchableOpacity>
                                </View>

                                {check && <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View style={styles.comment}>
                                        <FlatList nestedScrollEnabled
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                            }}
                                            data={dataItem_LVComment}
                                            renderItem={({ item }) => <Item_listviewComment dataComment={item} />}
                                            keyExtractor={item => item._id.toString()}
                                        />
                                        <View style={styles.styleComment}>
                                            <TextInput placeholder='Bình luận' style={styles.TextComment} />
                                        </View>

                                    </View>
                                </View>
                                }


                            </View>

                        );
                    }}
                />
            </View>

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
        backgroundColor: '#777777',
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
    },
    container1: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        alignItems: 'center'
    },

    imgavtar1: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 10,
        marginEnd: 20,
        marginBottom: 10,

    },
    boderimage1: {
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


    Viewname1: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginStart: 10,
        width: 'auto',


    },
    textname1: {
        fontSize: 18,

        width: 'auto'



    },



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



export default HomeScreen;
