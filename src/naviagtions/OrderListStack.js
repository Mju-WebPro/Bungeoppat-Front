import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderListPage from '../pages/OrderListPage';
import WriteReviewPage from '../pages/WriteReviewPage';

const Stack = createStackNavigator();

const OrderListStack = () => {
    return (
        <Stack.Navigator initialRouteName="OrderListPage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrderListPage" component={OrderListPage} />
            <Stack.Screen name="WriteReviewPage" component={WriteReviewPage} />
        </Stack.Navigator>
    )
}

export default OrderListStack;