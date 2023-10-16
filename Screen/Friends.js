import React, { Component, useState, useEffect } from 'react';
import {
  View, Text, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,

} from 'react-native';
import Item_listViewFriends from '../Item/item_listViewFriends';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';




const ACCOUNT_API = "https://6528c972931d71583df2736f.mockapi.io/account";

function Friends() {
  const [followingList, setFollowingList] = useState([]);
  const [followingLists, setFollowingLists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [idUser, setIdUser] = useState("");
  const [filteredFollowingList, setFilteredFollowingList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(ACCOUNT_API);
        const users = response.data;

        // Lấy ID của người đăng nhập
        const userID = await AsyncStorage.getItem("id_user");
        if (userID) {
          setIdUser(userID);
        }

        // Loại bỏ người đang đăng nhập khỏi danh sách người dùng
        const filteredUsers = users.filter((user) => user.idUser !== userID);

        setFollowingList(filteredUsers);
        setFollowingLists(users)
      } catch (error) {
        console.error("Lỗi khi tải danh sách người dùng: ", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const filteredList = followingList.filter((user) =>
      user.NameUser.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFollowingList(filteredList);
  }, [followingList, searchText]);

  const toggleFollowing = async (userId) => {
    const userfl = followingLists.find((user) => user.idUser === idUser);

    if (userfl) {
      const isFollowing = userfl.list_follow.includes(userId);
      const updatedListFollow = isFollowing
        ? userfl.list_follow.filter((id) => id !== userId)
        : [...userfl.list_follow, userId];

      try {
        const response = await axios.put(
          `${ACCOUNT_API}/${idUser}`,
          {
            list_follow: updatedListFollow,
          }
        );

        if (response.status === 200) {
          // Cập nhật trạng thái và văn bản của nút theo kết quả kiểm tra
          const updatedFollowingList = followingLists.map((user) => {
            if (user.idUser === idUser) {
              return {
                ...user,
                isFollowing: !isFollowing,
                list_follow: updatedListFollow,
              };
            }
            return user;
          });

          setFollowingLists(updatedFollowingList);
        } else {
          console.error("Lỗi khi cập nhật danh sách theo dõi");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật danh sách theo dõi: ", error);
      }
    }
  };





  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
      style={{marginBottom:100}}
        data={filteredFollowingList}
        renderItem={({ item: followingUser }) => {
          const array = followingLists.find((user) => user.idUser === idUser);
          const isFollowing = array.list_follow.includes(followingUser.idUser);
          return (
            <View style={styles.container1}>
              <View style={styles.Viewname1}>
                <Image style={styles.imgavtar1} source={{uri: followingUser.avatar}} />
                <Text style={styles.textname1}>{followingUser.NameUser}</Text>
              </View>

              <TouchableOpacity
                style={{ marginTop: 20, marginStart: 90 }}
                onPress={() => toggleFollowing(followingUser.idUser)}
              >
                <View
                  style={{
                    backgroundColor: isFollowing ? 'white' : 'black',
                    width: 100,
                    height: 32,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: isFollowing ? 'black' : 'white',
                      fontFamily: 'Shrikhand-Regular-SVG',
                    }}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  searchInput: {
    padding: 10,
    margin: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  userCell: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  imageUser: {
    width: 40,
    height: 40,
  },
  userName: {
    marginLeft: 10,
    fontSize: 20,
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 10,
  },
  followButtonText: {
    color: "white",
    fontSize: 16,
  },
  container1: {
    backgroundColor: '#EEEEEEEE',
    margin: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  imgavtar1: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginStart: 10,
    marginEnd: 20,
    marginBottom: 10
  },
  Viewname1: {
    flexDirection: 'row',
    marginTop: 10,
    width: '45%'
  },
  textname1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10
  },
});



export default Friends;
