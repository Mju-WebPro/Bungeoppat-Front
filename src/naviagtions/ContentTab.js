import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ContentRoutes } from "./routes";
// import HomePage from '../pages/HomePage';
// import StoreInfoPage from '../pages/StoreinfoPage';
// import StoreListPage from '../pages/StoreListPage';
import BoardPage from "../pages/BoardPage";
import { Image } from "react-native";
import MapStack from './MapStack';
import OrderListStack from './OrderListStack';

const Tab = createBottomTabNavigator();

const ContentTab = () => {
    const getTabBarIcon = (routeName, focused) => {
        let iconSource;
        switch (routeName) {
            case ContentRoutes.MapStack.name:
                iconSource = focused ? require('../images/homeIcon.png') : require('../images/homeIcon.png');
                break;
            // case ContentRoutes.OrderStack.name:
            //   iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
            //   break;
            case ContentRoutes.OrderListStack.name:
                iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
                break;
            case ContentRoutes.BoardPage.name:
                iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
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
            })}
            // tabBarOptions={{
            //     activeTintColor: 'tomato',
            //     inactiveTintColor: 'gray',
            // }}
        >
            <Tab.Screen name={ContentRoutes.MapStack.name} component={MapStack} />
            {/* <Tab.Screen name={ContentRoutes.OrderStack.name} component={OrderStack} /> */}
            <Tab.Screen name={ContentRoutes.OrderListStack.name} component={OrderListStack} />
            <Tab.Screen name={ContentRoutes.BoardPage.name} component={BoardPage} />
        </Tab.Navigator>
    );
};

export default ContentTab;
