import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity} from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const OrderListPage = () => {
    const [orderList, setOrderList] = useState([]);
    const userId = 1;
    const navigation = useNavigation();

    const handleWriteReview = (storeInfo, userInfo, reviewInfo) => {
        navigation.navigate('WriteReviewPage', { storeInfo, userInfo, reviewInfo });
    };

    const fetchOrderList = () => {
        fetch(`http://172.20.10.5:8080/userOrder/getAllOrders?userId=${userId}`)
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
        <View style={styles.header}>
            <Image
                source={require("../images/sideBar.png")}
                style={styles.headerimage}
            />
        </View>
        <ScrollView style={styles.resultBox}>
                {orderList.map(order => (
                    <View key={order.orderId} style={styles.resultContainer}>
                        <Text style={styles.text}>가게 이름: {order.storeId.name}</Text>
                        <Text style={styles.text}>수량: {order.quantity}, 가격: {order.price}</Text>
                        <Text style={styles.text}>픽업 시간: {order.pickUpMinute}</Text>
                        {order.reviewId.starRating === null && (
                        <TouchableOpacity
                            onPress={() => {
                                handleWriteReview(order.storeId, order.userId, order.reviewId);
                            }}
                            style={styles.reviewButton}
                        >
                            <Text style={styles.reviewButtonText}>Review 쓰기</Text>
                        </TouchableOpacity>
                    )}
                    </View>
                ))}
            </ScrollView>
        <View style={styles.bottomBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7DC",
    },
    header: {
        height: 180,
        alignItems: "center",
        justifyContent: "center",
    },
    headerimage: {
        height: "110%",
        width: "100%",
    },
    resultBox: {
        marginTop: 20, // header 아래로 위치
        flex: 1,
        paddingHorizontal: 20,
    },
    resultContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        elevation: 2,
    },
    bottomBar: {
        backgroundColor: "#F2D98D",
        height: 70,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    text: {
        color: "#000000",
        fontSize: 18,
    },
    reviewButton: {
        backgroundColor: '#3498db',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    reviewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default OrderListPage;