import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const OrderListPage = () => {
  const [orderList, setOrderList] = useState([]);
  const userId = 1;
  const navigation = useNavigation();

  const handleWriteReview = (storeInfo, userInfo, reviewInfo) => {
    navigation.navigate('WriteReviewPage', { storeInfo, userInfo, reviewInfo });
  };

  const fetchOrderList = () => {
    fetch(`http://ec2-3-35-203-41.ap-northeast-2.compute.amazonaws.com:8080/userOrder/getAllOrders?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 실패했습니다');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 0) {
          if (data.orders && data.orders.length > 0) {
            setOrderList(data.orders);
            console.log('Order list:', data.orders);
          } else {
            Alert.alert('알림', '주문 목록이 없습니다.');
          }
        } else {
          Alert.alert('알림', '사용자 정보가 잘못되었습니다.');
        }
      })
      .catch(error => {
        console.error('사용자 주문을 가져오는 중 오류 발생:', error);
      });
  };

  // Use useFocusEffect to fetch data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchOrderList();
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../images/sideBar.png')} style={styles.headerImage} />
      <ScrollView style={styles.resultBox}>
        {orderList.map(order => (
          <View key={order.orderId} style={styles.resultContainer}>
            <View style={styles.imageAndTextContainer}>
              <Image source={require('../images/fish.png')} style={styles.orderImage} />
              <View style={styles.textContainer}>
                <Text style={styles.storeName}>{order.storeName}</Text>
                <Text style={styles.orderDetails}>수량: {order.quantity} 개, 가격: {order.price} 원</Text>
                <Text style={styles.orderDetails}>픽업 시간: {order.pickUpMinute} 분</Text>
              </View>
            </View>
            {order.starRating !== null ? (
              <Text style={styles.reviewCompleteText}>리뷰 작성을 완료했어요!</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleWriteReview(order.storeId, order.userId, order.reviewId);
                }}
                style={styles.reviewButton}
              >
                <Text style={styles.reviewButtonText}>리뷰를 작성해주세요!</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7DC',
  },
  headerImage: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
  },
  resultBox: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5, 
    shadowRadius: 6,  
    elevation: 2,
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  storeName: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 50,
    textAlign: 'center', // Center-align the store name
  },
  orderDetails: {
    color: '#666666',
    fontSize: 16,
    marginBottom: 5,
  },
  reviewButton: {
    backgroundColor: '#F2D98D',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10, // Adjust the spacing between image and text as needed
  },
  orderImage: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  reviewCompleteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60', // Green color or any color you prefer
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OrderListPage;
