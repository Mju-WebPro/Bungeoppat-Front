import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage from "../pages/MyPage";

const Stack = createStackNavigator();

const MyPageStack = () => {
    return (
        <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
    );
};

export default MyPageStack;