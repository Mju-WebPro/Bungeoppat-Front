import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

const MyPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [age, setAge] = useState('');

    const regionList = ['강남구', '강동구', '광진구', '중랑구', '서대문구', '동대문구', '성동구'];

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleRegionSelection = (region) => {
        setSelectedRegion(region);
        toggleModal();
    };

    const handleAgeChange = (enteredAge) => {
        setAge(enteredAge);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Image source={require('../images/sideBar.png')} style={styles.sideBar} />
                <View style={styles.blackRectangle}>
                    <View style={styles.textContainer}>
                        <Image source={require('../images/myYellow.png')} style={styles.ticketImage} />
                        <Text style={styles.boxText}>
                            내 정보 확인
                        </Text>
                    </View>
                    <View style={styles.whiteRectangle}>
                        <View style={styles.productContainer}>
                            <Text style={styles.productText}>닉네임:</Text>
                            <View style={styles.quantityContainer}>
                                <Text style={styles.productText}>겨울이</Text>
                            </View>
                        </View>
                        <View style={styles.productContainer}>
                            <Text style={styles.productText}>나이:</Text>
                            <TextInput
                                style={styles.productText}
                                keyboardType="numeric"
                                placeholder="나이 입력"
                                onChangeText={handleAgeChange}
                                value={age}
                            />
                        </View>
                        <View style={styles.productContainer}>
                            <Text style={styles.productText}>지역:</Text>
                            <TouchableOpacity onPress={toggleModal} style={styles.quantityContainer}>
                                <Text style={styles.productText}>{selectedRegion || '지역 선택'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {regionList.map((region) => (
                                <TouchableOpacity
                                    key={region}
                                    style={styles.modalItem}
                                    onPress={() => handleRegionSelection(region)}
                                >
                                    <Text>{region}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
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
        top: 320,
        left: 86,
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(135, 206, 235, 0.6)',
        width: 320,
        height: 450,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'lightgray',
        shadowOffset: {
            width: 5,
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
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 5,
        top: -2,
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
        height: 260,
        borderRadius: 10,
        top: -2,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 150,
        height: 40,
        marginLeft: -35,
        marginTop: 10,
        marginBottom: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalItem: {
        alignItems: 'center',
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 150,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'white', // TextInput 배경색 설정
    },
});

export default MyPage;