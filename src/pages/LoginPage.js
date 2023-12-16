import {StyleSheet, SafeAreaView, Image, Pressable, Button, Text} from 'react-native';
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContentRoutes } from '../naviagtions/routes';
import { useNavigation } from '@react-navigation/native';
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

export default function Login() {
  const navigation = useNavigation();

  const gohome = async () => {
    const tokenData = {
      accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3b2RuZDAxMzFAbmF2ZXIuY29tIiwiYXV0aCI6IlVTRVIsVVNFUiIsImlzQWRkaXRpb25hbEluZm9Qcm92aWRlZCI6dHJ1ZSwiZXhwIjoxNzAzMDk0Njg0fQ.LFTMKULCb1cLpvK0L2wTovUpS6jseUfuGk0GmMZqQuAVisTL7xBL9414wJinSASlrZclw5UIjdLHEpjjoy6Ywg",
      refreshToken: "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDUzMjY2ODQsInVzZXJJZCI6MX0.aBipDa-GGnewzRxnoG2rSzliN3R778yB231XwTQ4ZRU",
      userId: 1,
      process: "로그인 성공"
  };
    await AsyncStorage.setItem('userData', JSON.stringify(tokenData));
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
    <SafeAreaView style={styles.container}>
      <Button title="gohome" onPress={() => gohome()} />
      <Pressable onPress={() => gohome()}>
        <Image
          source={{
            uri: `https://kiwes-bucket.s3.ap-northeast-2.amazonaws.com/main/google_login.png`,
          }}
          style={styles.oauth}
          resizeMode="contain"
        />
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oauth: {
    aspectRatio: 5,
    width: '70%',
  },
});
