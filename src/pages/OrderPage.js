import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from "react-native";

const OrderPage = ({ navigation, route }) => {
    const [selectedMinutes, setSelectedMinutes] = useState(null);
    const [quantityPap, setQuantityPap] = useState(0);
    const [quantityCream, setQuantityCream] = useState(0);

    const { item } = route.params || {};
    console.log(item);

    const renderCheckbox = (minutes, text) => (
        <TouchableOpacity
            style={[
                styles.checkboxContainer,
                selectedMinutes === minutes && {
                    borderColor: "#000000",
                    backgroundColor: "#87CEEB",
                },
            ]}
            onPress={() => handleCheckboxPress(minutes)}
        >
            <Text style={styles.checkboxText}>{text}</Text>
        </TouchableOpacity>
    );

    const handleCheckboxPress = (minutes) => {
        setSelectedMinutes((prevSelected) => {
            if (prevSelected === minutes) {
                return null;
            }
            return minutes;
        });
    };

    const handleQuantityChange = (amount, type) => {
        if (type === "pap") {
            setQuantityPap((prevQuantity) => {
                const newQuantity = prevQuantity + amount;
                return newQuantity >= 0 ? newQuantity : 0;
            });
        } else if (type === "cream") {
            setQuantityCream((prevQuantity) => {
                const newQuantity = prevQuantity + amount;
                return newQuantity >= 0 ? newQuantity : 0;
            });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Image
                    source={require('../images/sideBar.png')}
                    style={styles.headerImage}
                />
            </View>
            <View style={styles.middleView}>
                <View style={styles.orderHeader}>
                    <Image
                        source={require('../images/ticketGray.png')}
                        style={styles.ticketIcon}
                    />
                    <Text style={styles.middleText}>주문요청서</Text>
                </View>
                <View style={styles.pickupRow}>
                    <Image
                        source={require('../images/checkBox.png')}
                        style={styles.checkboxIcon}
                    />
                    <Text style={styles.pickupText}>픽업시간</Text>
                </View>
                <View style={styles.checkboxRow}>
                    {renderCheckbox(5, "5분후")}
                    {renderCheckbox(10, "10분후")}
                    {renderCheckbox(30, "30분후")}
                </View>
                <View style={styles.pickupRow}>
                    <Image
                        source={require('../images/checkBox.png')}
                        style={styles.checkboxIcon}
                    />
                    <Text style={styles.pickupText}>주문 메뉴 & 수량</Text>
                </View>
                <View style={styles.pickupMenu}>
                    <Text style={styles.smallPickupText}>팥 붕어빵</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(-1, "pap")}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantityPap}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(1, "pap")}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.pickupMenu}>
                    <Text style={styles.smallPickupText}>슈크림 붕어빵</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(-1, "cream")}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantityCream}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(1, "cream")}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottomBar}>
                <Button
                    title="이동하기"
                    onPress={() =>
                        navigation.navigate("WebViewPage", {
                          uri: "http://192.168.219.144:54079/payment.html",
                          selectedMinutes: selectedMinutes,
                          quantityPap: quantityPap,
                          quantityCream: quantityCream,
                          item: item,
                        })
                    }
                />
            </View>
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
    header: {
        height: 180,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    headerImage: {
        height: '100%',
        width: '100%',
        top: -70,
        resizeMode: 'contain',
    },
    middleView: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: 380,
        width: 300,
        minHeight: "50%",
        top: -40,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4.65,
        elevation: 6,
    },
    middleText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
        marginLeft: 10,
    },
    pickupText: {
        color: "#FFF7DC",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 8,
        marginRight: 90,
    },
    smallPickupText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#FFFFFF",
        padding: 5,
    },
    checkboxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 180,
        marginBottom: 10,
    },
    checkboxText: {
        color: "#FFFFFF",
    },
    checkboxIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    quantityButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000000",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
    quantityText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ticketIcon: {
        width: 50,
        height: 50,
        marginLeft: -20,
    },
    pickupButton: {
        backgroundColor: '#FFA50090',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: -20,
    },
    pickupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    pickupRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        width: 220,
    },
    pickupMenu: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
        padding: 5,
        width: 220,
        justifyContent: "space-between",
    },
});

export default OrderPage;
