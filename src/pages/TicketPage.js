import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const TicketPage = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../images/sideBar.png')} style={styles.sideBar} />
            <View style={styles.blackRectangle}>
                <Text style={styles.boxText}>결제가 완료된 주문입니다. \n 사장님께 보여주세요.</Text>
                <View style={styles.whiteRectangle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    sideBar: {
        height: '100%',
        width: '100%',
        top: -310,
        resizeMode: 'contain',
    },
    blackRectangle: {
        position: 'absolute',
        top: 250,
        left: 95,
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: 300,
        height: 400,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxText: {
        color: 'yellow',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    whiteRectangle: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 230,
        height: 210,
        borderRadius: 10,
    },
});

export default TicketPage;