import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TextInput, Dimensions, Image, TouchableOpacity, ToastAndroid, } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const POST_API = "https://6528c972931d71583df2736f.mockapi.io/Post_news";
const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";
function UpdatePost({ navigation, route }) {
    const [seftdom, setSeftdom] = useState('Public');
    const [data, setData] = useState();
    const [title, setTitle] = useState('')

    const [idpost, setIdpost] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const id = route?.params?.id
            console.log("title" + id)
            setIdpost(id)
            if (id) {
                try {
                    const response = await axios.get(`${POST_API}/${id}`);
                    const postData = response.data;
                    setData(postData);
                    setSelectedImage(postData.imgPost);
                    setTitle(postData.Content);


                } catch (error) {
                    console.error("Lỗi khi lấy thông tin bài đăng:", error);
                }
            }
        };

        fetchData();
    }, [route]);



    const Update = async () => {
        if (title === "") {
            ToastAndroid.show("Không được để trống phần nội dung", 2)
            return;
        }
        else {
            
            const updatedPost = {
                Content: title,
                imgPost: selectedImage,
            };
            try {
                const response1 = await axios.put(`${POST_API}/${idpost}`, updatedPost);
                if (response1.status === 200) {
                    navigation.navigate("Tab_bottom")
                    ToastAndroid.show("Bài đăng đã được cập nhật", 2);
                } else {
                    ToastAndroid.show("Có lỗi xảy ra khi cập nhật bài đăng", 2);
                }

            } catch (error) {
                console.error("lỗi" + error)
            }
        }


    };
    const openImagePicker = () => {

        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {

                const imageUri = response.assets[0].uri;

                setSelectedImage(imageUri);
                console.log("Đường dẫn: " + imageUri);
            }
        });
    };



    return (
        <View style={styles.container}>
            <ImageBackground source={require("E:/React Native/Assignment/Img/SignIn.jpg")} style={{ width: "100%", height: "100%", zIndex: 0 }}>

                <View >
                    <View style={styles.content}>
                        <TextInput
                            placeholder='Bạn Đang Nghĩ Gì Thế ?'
                            style={{ marginStart: 10 }}
                            onChangeText={(value) => setTitle(value)}
                            value={title}

                        />
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={{ width: "90%", height: 200, borderRadius: 10, marginTop: 120, marginStart: 15 }} />
                        ) : (
                            <Text style={{ fontSize: 20, marginTop: 200, marginStart: 90 }}>Chưa chọn ảnh</Text>
                        )}


                    </View>

                    <View style={styles.content_add}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20 }}>Thêm Vào Bài Viết:</Text>
                        <TouchableOpacity onPress={openImagePicker}>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_image.png')}
                                style={styles.image_icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('E:/React Native/Assignment/Img/icon_gif.png')}
                                style={styles.image_icon}
                            />
                        </TouchableOpacity>



                    </View>
                    <View style={{ width: 140, height: 35, borderWidth: 2, borderRadius: 10, justifyContent: 'center', marginStart: 50, marginTop: 15 }}>
                        <Picker
                            selectedValue={seftdom}
                            style={{ height: 50, width: 130 }}
                            onValueChange={(itemValue, itemIndex) => setSeftdom(itemValue)}
                        >
                            <Picker.Item label="Public" value="Public" />
                            <Picker.Item label="Private" value="Private" />
                        </Picker>

                    </View>







                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => Update()}>
                            <View style={{ backgroundColor: '#6699FF', width: 200, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Update</Text>
                            </View>

                        </TouchableOpacity>
                    </View>





                </View>



            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '40%'

    },
    content: {
        backgroundColor: 'white',
        width: '80%',
        height: '50%',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        marginLeft: 40,
        marginTop: 30

    },
    content_add: {
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '80%',
        height: '20%',
        borderColor: '#33CCFF',
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: 40,
        marginTop: 30,
        flexDirection: 'row',
        paddingTop: 20

    },
    image_icon: {
        width: 60,
        height: 60,
        borderRadius: 60,
        marginStart: 10
    },


})

export default UpdatePost;
