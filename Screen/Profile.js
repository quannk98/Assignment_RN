import React, { Component, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Item_listviewProfile from '../Item/item_listviewProfile';
import Item_listviewPostShare from '../Item/item_listviewPostShare';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const POST_API = "https://6528c972931d71583df2736f.mockapi.io/Post_news";
const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";

function Profile({ navigation, route }) {
  const [userId, setUserId] = useState(0);
  const [names, setNames] = useState();
  const [listfollow, setListfollow] = useState([]);
  const [listpost, setListpost] = useState([]);
  const [account, setAccount] = useState()
  useEffect(() => {
    const fetchData = async () => {
      
      
      const idUser = await AsyncStorage.getItem("id_user");


      const accountResponse = await axios.get(`${ACCOUNT_API}/${idUser}`);
      const userAccount = accountResponse.data;
      setAccount(userAccount);
      setNames(userAccount.NameUser)
      if (userAccount) {
        setListfollow(userAccount.list_follow.length);
      }

      const postsResponse = await axios.get(`${POST_API}?idUser=${idUser}`);
      setListpost(postsResponse.data.length);
    };



    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);

  }, [])

  function ClickLogout() {
    navigation.navigate('SignUp')
  }
  function Update() {
    navigation.navigate('UpdateProfile',{ten: names})
    console.log("aa"+names)
  }

  return (
    <View style={{ width: '100%', height: 740 }}>
      <ScrollView>
        <View style={{ backgroundColor: '#EEEEEE', }}>
          <ImageBackground source={require('E:/React Native/Assignment/Img/zelensky.jpg')} style={{ width: '100%', height: 200 }}>
            <View style={styles.stylename}>

              <View >
                <Image style={styles.imgavtar} source={{ uri: account?.avatar }}
                />

              </View>
              <View style={styles.stylefollow}>
                <View style={{ alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                  <Text style={styles.textnumber}>{listpost}</Text>
                  <Text style={styles.text}>Posts</Text>
                </View>
                <View style={{ alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                  <Text style={styles.textnumber}>{listfollow}</Text>
                  <Text style={styles.text}>Follow</Text>
                </View>
                <View style={{ alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                  <Text style={styles.textnumber}></Text>
                  <Text style={styles.text}>Follower</Text>
                </View>
              </View>

            </View>
            <View style={{ width: 180, alignItems: 'center' }}>
              <Text style={styles.textname}>{names}</Text>
            </View>

          </ImageBackground>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 80 }}>
            < TouchableOpacity onPress={() =>Update()}>
              <View style={{ backgroundColor: '#6699FF', width: 320, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 15, marginLeft: 18 }}>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Chỉnh Sửa Trang Cá Nhân</Text>

              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => ClickLogout()}>
                <Image style={{ width: 80, height: 80 }} source={require('E:/React Native/Assignment/Img/icon_dangxuat-removebg-preview.png')} />
              </TouchableOpacity>
            </View>


          </View>

          <View>
            {dataItem_LVProfile.map((item) => (<Item_listviewProfile key={item._id} dataProfile={item} />))}
          </View>



        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10
  },
  stylename: {
    margin: 10,
    marginTop: 130,
    flexDirection: 'row'


  },
  stylefollow: {
    flexDirection: 'row',
    marginTop: 50,


  },
  imgavtar: {
    width: 110,
    height: 110,
    borderRadius: 80,
    marginStart: 20,
    marginEnd: 10,
    marginBottom: 10
  },
  textnumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18
  },
  textname: {
    fontSize: 18,
    fontFamily: 'Shrikhand-Regular-SVG',


  }



})
const dataItem_LVProfile =
  [
    {
      "_id": "1",
      "title": "Trường công lập đầu tiên dạy và thi chương trình dự bị đại học Mỹ",
      "content": "Phổ thông Năng khiếu là trường công lập đầu tiên ở Việt Nam dạy và thi 6 môn của chương trình Advanced Placement (AP), thường gọi là chương trình dự bị đại học Mỹ.",
      "image": "https://i1-vnexpress.vnecdn.net/2023/02/02/328463889-891024988600042-6177-9136-2603-1675295134.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BCVEDMn0Smx1XLiCRi0rrA",
      "name": "Putin",
      "createdAt": "2023-01-12T06:26:17.539Z",
      "createdBy": {
        "_id": "63ac39aeedf7c80016c57a67",
        "name": "",
        "avatar": ""

      }
    },
    {
      "_id": "2",
      "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
      "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
      "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/117f5804708184dfdd90-162556098-1999-1999-1675148782.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=Ie6cEqbs1YL8PDAG85QrsA",
      "name": "Zelensky",
      "createdAt": "2023-01-12T06:26:17.539Z",
      "createdBy": {
        "_id": "63ac39aeedf7c80016c57a67",
        "name": "",
        "avatar": ""
      }
    },
    {
      "_id": "3",
      "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
      "name": "Obama",
      "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
      "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
      "createdAt": "2023-01-12T06:26:17.539Z",
      "createdBy": {
        "_id": "63ac39aeedf7c80016c57a67",
        "name": "",
        "avatar": ""
      }
    },
  ]



export default Profile;
