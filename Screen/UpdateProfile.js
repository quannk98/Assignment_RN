import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ImageBackground, ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const POST_API = "https://6528c972931d71583df2736f.mockapi.io/Post_news";
const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";
function UpdateProfile({ navigation,route }) {
    const [names, setNames] = useState();
    const [data, setData] = useState()
    const [idUser, setIdUser] = useState()
    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const ten = route?.params?.ten
            setNames(ten)
            const iduser = await AsyncStorage.getItem("id_user");
            setIdUser(iduser)
            const accountResponse = await axios.get(`${ACCOUNT_API}/${idUser}`);
            const userAccount = accountResponse.data;
            setData(userAccount);
            setSelectedImage((userAccount.avatar))
           
        };
        fetchData();

    }, [route])
    const Update = async () => {
        if (names === "") {
            ToastAndroid.show("Không được để trống phần tên", 2)
            return;
        }
        else {
            const update_profile = {
                NameUser: names,
                avatar: selectedImage
            }
            const update_profile1 = {
                imgUser: selectedImage
            }


            try {

                const response1 = await axios.put(`${ACCOUNT_API}/${idUser}`, update_profile);
                const response2 = await axios.put(`${POST_API}/${idUser}`, update_profile1);
                if (response1.status === 200 && response2.status === 200) {
                    ToastAndroid.show("Cập nhật thành công", 2);
                    navigation.navigate('Tab_bottom')
                }
            } catch (error) {
                console.error('Lỗi khi cập nhật:', error);
                alert('Có lỗi xảy ra khi cập nhật thông tin.');
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
        <View >
            <ImageBackground source={require("E:/React Native/Assignment/Img/SignIn.jpg")} style={{ width: "100%", height: "110%", alignContent: "center" }}>
                <Image source={{ uri: selectedImage }} style={{ width: 300, height: 200, borderRadius: 10,marginTop: 50,marginStart:55,marginBottom:20 }} />
                <TouchableOpacity onPress={() => openImagePicker()} >
                    <View style={{ backgroundColor: '#6699FF', width: 200, height: 40, borderRadius: 8, marginStart: 100, alignItems: "center", justifyContent: 'center',marginBottom:10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Đổi Ảnh Cá Nhân</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={{ borderWidth: 2, borderRadius: 10,width:"90%",marginStart:20,marginTop:20,fontSize:22,paddingStart:20, fontFamily: 'Shrikhand-Regular-SVG', }}
                    onChangeText={(value) => setNames(value)}
                    value={names}
                />
                <TouchableOpacity onPress={() => Update()}>
                    <View style={{ backgroundColor: '#6699FF', width: 300, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center',marginTop:20,marginStart:55 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Cập Nhật</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>

        </View>
    );
}


export default UpdateProfile;
