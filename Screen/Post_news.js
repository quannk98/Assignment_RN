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
function Post_news({ navigation }) {
  const [seftdom, setSeftdom] = useState('Public');
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [imguser, setimguser] = useState('')
  const [userId, setUserId] = useState();
  const [position, setPosition] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const role = await AsyncStorage.getItem("user_role");
      const ten = await AsyncStorage.getItem("name_user")
      const id = await AsyncStorage.getItem("id_user");
      const img = await AsyncStorage.getItem("user_img");
      setPosition(role);
      setName(ten)
      setUserId(id)
      setimguser(img)
    };

    fetchData();
  }, []);


  function SignUp() {
    navigation.navigate('SignUp')


  }

  const Post = async () => {
    if (title === "") {
      ToastAndroid.show("Không được để trống phần nội dung", 2)
      return;
    }

    try {
      const newposts = {
        Content: title,
        NameUser: name,
        idUser: userId,
        sefdom: seftdom,
        comment: false,
        imgPost: selectedImage,
        imgUser: imguser


      }
      const response = await axios.post(POST_API, newposts);
      if (response.status === 201) {

        ToastAndroid.show("Đăng bài thành công", 2)

        setTitle("")
       
      }
      else {
        console.log("Lỗi khi tạo bảng")
      }
    } catch (error) {
      console.error("Lỗi 2", error)
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
        {position != "Admin" && <View style={{ alignItems: 'center', marginTop: 10, paddingTop: 10 }}>
          <Text style={styles.text}> Bạn Cần Phải Đăng Nhâp Với Tài Khoản Admin Mới Có Thể Sử Dụng Chứng Năng Đăng Tin </Text>
          <Button
            title='Sign Up'
            onPress={() => SignUp()}
          />
        </View>}
        {position === "Admin" && <View >
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
            <TouchableOpacity onPress={() => Post()}>
              <View style={{ backgroundColor: '#6699FF', width: 200, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Đăng Tin</Text>
              </View>

            </TouchableOpacity>
          </View>





        </View>

        }

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


export default Post_news;

