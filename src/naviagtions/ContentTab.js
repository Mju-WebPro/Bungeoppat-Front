import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContentRoutes } from './routes';
import HomePage from '../pages/HomePage';
import StoreInfoPage from '../pages/StoreinfoPage';
import StoreListPage from '../pages/StoreListPage';
import OrderPage from '../pages/OrderPage';
import TicketPage from '../pages/TicketPage';
import MapStack from './MapStack';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const ContentTab = () => {
    const getTabBarIcon = (routeName, focused) => {
        let iconSource;
        switch (routeName) {
            case ContentRoutes.HomePage.name:
                iconSource = focused ? require('../images/homeIcon.png') : require('../images/homeIcon.png');
                break;
            case ContentRoutes.MapPage.name:
                iconSource = focused ? require('../images/homeIcon.png') : require('../images/homeIcon.png');
                break;
            case ContentRoutes.StoreinfoPage.name:
                iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
                break;
            case ContentRoutes.StoreListPage.name:
                iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
                break;
            case ContentRoutes.OrderPage.name:
                iconSource = focused ? require('../images/fish.png') : require('../images/fish.png');
                break;
            case ContentRoutes.TickPage.name:
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
            initialRouteName={ContentRoutes.HomePage.name}
            screenOptions={({ route, focused }) => ({
                tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
                headerShown: false,
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name={ContentRoutes.HomePage.name} component={HomePage} />
            <Tab.Screen name={ContentRoutes.MapPage.name} component={MapStack} />
            <Tab.Screen name={ContentRoutes.StoreinfoPage.name} component={StoreInfoPage} />
            <Tab.Screen name={ContentRoutes.StoreListPage.name} component={StoreListPage} />
            <Tab.Screen name={ContentRoutes.OrderPage.name} component={OrderPage} />
            <Tab.Screen name={ContentRoutes.TickPage.name} component={TicketPage} />
        </Tab.Navigator>
    );
};

export default ContentTab;

