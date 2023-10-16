import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, StyleSheet, ToastAndroid } from 'react-native';

function SignIn({ navigation }) {
  const [ShowGmail, setShowGmail] = useState(false);
  const [ShowPass, setShowPass] = useState(false);
  const [ShowRePass, setShowRePass] = useState(false);
  const [ShowSignIn, setShowSignIn] = useState(false);
  const [ShowName, setShowName] = useState(false);
  const [ShowCodeAdmin, setShowCodeAdmin] = useState(false);
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState('');
  const [name, setName] = useState('');
  const [roles, setRoles] = useState('Thành Viên');
  const [codeadmin, setCodeadmin] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setShowName(true);
    }, 500);
    setTimeout(() => {
      setShowGmail(true);
    }, 1000);
    setTimeout(() => {
      setShowPass(true);
    }, 1500);
    setTimeout(() => {
      setShowRePass(true);
    }, 2000);
    setTimeout(() => {
      setShowCodeAdmin(true);
    }, 2500);
    setTimeout(() => {
      setShowSignIn(true);
    }, 3000);

    if (codeadmin === '123') {
      setRoles('Admin');
    }
  }, [codeadmin]);

  const Accept = async () => {
    if (name === "" || password === "" || repass === "" || gmail === "") {
      ToastAndroid.show("Không được để trống", 2);
      return;
    } else if (password !== repass) {
      ToastAndroid.show("Mật khẩu không khớp", 2);
      return;
    } else if (password === repass) {
      const profile = {
        NameUser: name,
        GmailUser: gmail,
        Password: password,
        role: roles,
      };

      try {
        const response = await axios.post(
          "https://6528c972931d71583df2736f.mockapi.io/account",
          profile
        );

        if (response.status === 201) {
          ToastAndroid.show("Đăng ký thành công", 2);
          navigation.navigate("SignUp");
        } else {
          ToastAndroid.show("Có lỗi xảy ra", 2);
          console.log(response.status);
        }
      } catch (error) {
        ToastAndroid.show("Lỗi khi đăng ký", 2);
        console.log("Lỗi: ", error);
      }
    }
  };

  return (
    <View>
      <ImageBackground source={require("E:/React Native/Assignment/Img/SignIn.jpg")} style={{ width: "100%", height: "110%" }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('E:/React Native/Assignment/Img/bg1.jpg')}
            style={{
              width: '90%',
              height: 250,
              margin: 20,
              borderRadius: 10
            }}
          />

          <View style={{ alignItems: 'center' }}>
            {ShowName && <TextInput style={styles.TextInput}
              placeholder='Tên của bạn'
              onChangeText={(value) => setName(value)}
              value={name}
            />}
            {ShowGmail && <TextInput style={styles.TextInput}
              placeholder='Nhập Gmail'
              onChangeText={(value) => setGmail(value)}
              value={gmail}
            />}
            {ShowPass && <TextInput style={styles.TextInput}
              placeholder='Nhập Password'
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
            />}
            {ShowRePass && <TextInput style={styles.TextInput}
              placeholder='Nhập lại Password'
              secureTextEntry={true}
              onChangeText={(value) => setRepass(value)}
              value={repass}
            />}
            {ShowCodeAdmin && <TextInput style={styles.TextInput}
              placeholder='Mã Admin'
              secureTextEntry={true}
              onChangeText={(value) => setCodeadmin(value)}
              value={codeadmin}
            />}
          </View>

          <View style={{ alignItems: 'center' }}>
            {ShowSignIn && <TouchableOpacity onPress={() => Accept()}>
              <View style={styles.SignInButton}>
                <Text style={styles.SignInText}>Sign In</Text>
              </View>
            </TouchableOpacity>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderRadius: 10,
    borderWidth: 2,
    width: 300,
    height: 40,
    marginTop: 30,
    paddingLeft: 10
  },
  SignInButton: {
    backgroundColor: '#6699FF',
    width: 250,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  SignInText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignIn;
