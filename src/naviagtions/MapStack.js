import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from '../pages/MapPage';
import MapSearchPage from '../pages/MapSearchPage';

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <Stack.Navigator initialRouteName="MapPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MapPage" component={MapPage} />
            <Stack.Screen name="MapSearchPage" component={MapSearchPage} />
        </Stack.Navigator>
    );
};

export default MapStack;
