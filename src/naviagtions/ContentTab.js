import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ContentRoutes } from "./routes";
import BoardPage from "../pages/BoardPage";
import { Image } from "react-native";
import MapStack from './MapStack';
import OrderListStack from './OrderListStack';
import MyPageStack from './MyPageStack';

const Tab = createBottomTabNavigator();

const ContentTab = () => {
    const getTabBarIcon = (routeName, focused) => {
        let iconSource;
        switch (routeName) {
            case ContentRoutes.MapStack.name:
                iconSource = focused ? require('../images/homeIcon.png') : require('../images/homeYellow.png');
                break;
            case ContentRoutes.OrderListStack.name:
                iconSource = focused ? require('../images/ticketBlue.png') : require('../images/ticketYellow.png');
                break;
            case ContentRoutes.BoardPage.name:
                iconSource = focused ? require('../images/talkIcon.png') : require('../images/talkyellow.png');
                break;
            case ContentRoutes.MyPageStack.name:
                iconSource = focused ? require('../images/myPage.png') : require('../images/myYellow.png');
                break;
            default:
                iconSource = null;
                break;
        }
        return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
    };

    return (
        <Tab.Navigator
            initialRouteName={ContentRoutes.MapStack.name}
            screenOptions={({ route, focused }) => ({
                tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
                headerShown: false,
                tabBarLabel: () => null,
            })}
        >
            <Tab.Screen name={ContentRoutes.MapStack.name} component={MapStack} />
            <Tab.Screen name={ContentRoutes.OrderListStack.name} component={OrderListStack} />
            <Tab.Screen name={ContentRoutes.BoardPage.name} component={BoardPage} />
            <Tab.Screen name={ContentRoutes.MyPageStack.name} component={MyPageStack} />
        </Tab.Navigator>
    );
};

export default ContentTab;