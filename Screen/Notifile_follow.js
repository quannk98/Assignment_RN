import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Item_listViewNotifile from '../Item/item_listViewNotifile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const POST_API = "https://6528c972931d71583df2736f.mockapi.io/Post_news";
const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";

function Notifile_follow() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const CloneData = async () => {
      try {
        const userID = await AsyncStorage.getItem("id_user");

        const response = await axios.get(POST_API);
        const response1 = await axios.get(ACCOUNT_API);
        console.log("bài đăng", response)

        const currentUser = response1.data.find((user) => user.idUser === userID);
        if (currentUser) {

          const followingIDs = currentUser.list_follow;
          console.log("id gồm", followingIDs)
          const filteredData = response.data.filter((item) => followingIDs.includes(item.idUser));
          console.log("Bài đăng của các người đang theo dõi:", filteredData);
          setData(filteredData);
        }
      }
      catch (error) {
        console.error("Lỗi " + error)
      }
    }

    const interval = setInterval(() => {
      CloneData();
    }, 10000);

    return () => clearInterval(interval);

  }, [])

  return (
    <View style={{ width: '100%', height: 740 }}>

      <FlatList
        data={data}
        renderItem={({ item: datanotifile }) => {
          return (
            <TouchableOpacity style={{ alignItems: "center" }}>
              <View style={styles.stylepost}>
                <Image style={styles.imgavtar} source={require('E:/React Native/Assignment/Img/putin.jpg')} />
                <Text style={styles.textname}>{datanotifile.NameUser}</Text>
                <Text style={{ fontSize: 18, marginTop: 18 }}> đã đăng 1 bài mới</Text>
              </View>
            </TouchableOpacity>
          )
        }

        }
      />


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

export default Notifile_follow;
