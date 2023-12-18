import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from '../pages/MapPage';
import MapSearchPage from '../pages/MapSearchPage';
import StoreinfoPage from '../pages/StoreinfoPage';
import OrderPage from '../pages/OrderPage';

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainPage" component={MapPage} />
            <Stack.Screen name="MapSearchPage" component={MapSearchPage} />
            <Stack.Screen name="StoreInfoPage" component={StoreinfoPage} />
            <Stack.Screen name="OrderPage" component={OrderPage} />
        </Stack.Navigator>
    );
};

export default MapStack;
