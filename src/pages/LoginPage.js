import {
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import { ContentRoutes } from "../naviagtions/routes";
import { useNavigation } from "@react-navigation/native";
import { LoginGoogle } from "../component/axios/LoginRequest";

export default function Login() {
  const navigation = useNavigation();

  const gohome = async () => {
    // await AsyncStorage.setItem('userData', JSON.stringify(tokenData));
    console.log("test");
    LoginGoogle().then((res) => {
      console.log(res.data.message);
    });
    navigation.replace(ContentRoutes.Main.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign in with Google" onPress={gohome} />

      <Pressable onPress={gohome}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  oauth: {
    aspectRatio: 5,
    width: "70%",
  },
});
