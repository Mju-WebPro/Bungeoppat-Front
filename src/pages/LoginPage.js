import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContentRoutes } from "../naviagtions/routes";
import { useNavigation } from "@react-navigation/native";
// import { LoginGoogle } from '../component/axios/LoginRequest';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import {
//   GOOGLE_WEB_CLIENT_ID,
//   GOOGLE_WEB_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URI,
// } from '../utils/GoogleConfig';

const LoginPage = ({}) => {
  const navigation = useNavigation();
  const gohome = async () => {
    const tokenData = {
      accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3b2RuZDAxMzFAbmF2ZXIuY29tIiwiYXV0aCI6IlVTRVIsVVNFUiIsImlzQWRkaXRpb25hbEluZm9Qcm92aWRlZCI6dHJ1ZSwiZXhwIjoxNzAzMDk0Njg0fQ.LFTMKULCb1cLpvK0L2wTovUpS6jseUfuGk0GmMZqQuAVisTL7xBL9414wJinSASlrZclw5UIjdLHEpjjoy6Ywg",
      refreshToken:
        "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDUzMjY2ODQsInVzZXJJZCI6MX0.aBipDa-GGnewzRxnoG2rSzliN3R778yB231XwTQ4ZRU",
      userId: 1,
      process: "로그인 성공",
    };
    await AsyncStorage.setItem("userData", JSON.stringify(tokenData));
    navigation.replace(ContentRoutes.Main.name);
  };

  // const signInWithGoogle = async () => {
  //   GoogleSignin.configure({
  //     webClientId: GOOGLE_WEB_CLIENT_ID,
  //     offlineAccess: true,
  //   });
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn().catch(error => {
  //     console.log(`Login Fail(code:${error.code})`, error.message);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('Login Cancel : ', error.message);
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log(`Login Fail(code:${error.code})`, error.message);
  //     }
  //     return;
  //   });
  //   if (!userInfo) {
  //     return;
  //   }
  //   const result = await fetch('https://oauth2.googleapis.com/token', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       code: userInfo.serverAuthCode,
  //       client_id: GOOGLE_WEB_CLIENT_ID,
  //       client_secret: GOOGLE_WEB_CLIENT_SECRET,
  //       grant_type: 'authorization_code',
  //       redirect_uri: GOOGLE_REDIRECT_URI,
  //     }),
  //   }).then(res => {
  //     return res.json();
  //   });
  //   LoginGoogle(result?.access_token)
  //   .then(async (res)=>{
  //     console.log(res.data.message);
  //     console.log(res.data.data.userId);
  //     await AsyncStorage.setItem('userData', JSON.stringify(res.data.data));
  //   });
  //   const data = await AsyncStorage.getItem('userData');
  //   console.log(data);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../images/mainBar.png")}
          style={styles.headerImage}
        />
      </View>
      <StatusBar style="auto" />

      <View style={styles.imageContainer}>
        <Image source={require("../images/fish.png")} style={styles.image} />
      </View>
      <SafeAreaView style={styles.bottomBar}>
        <TouchableOpacity style={styles.googleButton} onPress={gohome}>
          <Image
            source={require("../images/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7DC",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 200,
    width: "100%",
    top: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: "110%",
    width: "100%",
  },
  imageContainer: {
    top: -3,
    right: 0,
    height: 360,
    width: 360,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    bottom: -15,
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    backgroundColor: "#F2D98D",
    width: "100%",
    height: 150,
    top: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    backgroundColor: "#000000",
  },
});

export default LoginPage;
