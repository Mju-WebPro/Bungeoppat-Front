import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';

const TicketPage = ({ route }) => {

    const {selectedMinutes, quantityPap, quantityCream, item} = route.params || {};


    fetch('http://192.168.219.144:8080/payment/createPayment', {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeId: item.id,
            popFishNum: quantityPap,
            suFishNum: quantityCream,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Payment created successfully:', data);
    })
    .catch(error => {
        console.error('Error creating payment:', error);
    });

    const handlePickupCompletion = () => {
        console.log('픽업이 완료되었습니다.');
    };
    return (
        <View style={styles.container}>
            <Image source={require('../images/sideBar.png')} style={styles.sideBar} />
            <View style={styles.blackRectangle}>
                <View style={styles.textContainer}>
                    <Image source={require('../images/ticket.png')} style={styles.ticketImage} />
                    <Text style={styles.boxText}>
                        결제가 완료된 주문입니다.
                    </Text>
                </View>
                <View style={styles.whiteRectangle}>
                    <View style={styles.checkBoxContainer}>
                        <Image source={require('../images/checkBox.png')} style={styles.checkBoxImage} />
                        <View style={styles.checkTextContainer}>
                            <Text style={styles.checkText}>
                                고객님의 주문 내역입니다.
                            </Text>
                            <Text style={styles.checkText}>
                                수량을 체크해 주세요.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>팥 붕어빵</Text>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.productText}>3 개</Text>
                        </View>
                    </View>
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>슈크림 붕어빵</Text>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.productText}>2 개</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.pickupButton} onPress={handlePickupCompletion}>
                <Text style={styles.pickupButtonText}>픽업완료</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFF7DC",
    },
    sideBar: {
        height: '100%',
        width: '100%',
        top: -250,
        resizeMode: 'contain',
    },
    blackRectangle: {
        position: 'absolute',
        top: 230,
        left: 86,
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: 320,
        height: 410,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.65,
        elevation: 6,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    boxText: {
        color: "#FFF7DC",
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'center',
    },
    ticketImage: {
        width: 50,
        height: 50,
        marginLeft: -10,
    },
    whiteRectangle: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 280,
        height: 300,
        borderRadius: 10,
        top: -2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -7,
    },
    checkBoxImage: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginBottom: -5,
    },
    checkTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    checkText: {
        color: "#000",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
        paddingHorizontal: 30,
        width: '100%',
    },
    productText: {
        color: "#000",
        fontSize: 18,
        fontWeight: 'bold',
        width: '50%',
    },
    quantityContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: 85,
        height: 40,
        marginLeft: 40,
        marginTop: 10,
    },
    pickupButton: {
        backgroundColor: '#FFA50090',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        top: -45,
    },
    pickupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default TicketPage;
