import React from 'react';
import { Text } from 'react-native';

const OrderPage = ({ route, navigation }) => {
  const { item } = route.params || {};
  return (
    <Text>
      OrderPage
    </Text>
  );
};

export default OrderPage;
