import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../images/mainBar.png")}
                    style={styles.headerimage}
                />
            </View>
            <StatusBar style="auto" />

            <View style={styles.imageContainer}>
                <Image
                    source={require("../images/fish.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate("Main")}>
                    <Image source={require("../images/google.png")} style={styles.googleIcon} />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7DC",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        height: 200,
        width: "100%",
        top: -10,
        alignItems: "center",
        justifyContent: "center",
    },
    headerimage: {
        height: "110%",
        width: "100%",
    },
    imageContainer: {
        top: -3,
        right: 0,
        height: 360,
        width: 360,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000000",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 15,
        bottom: 15,
    },
    googleIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomBar: {
        backgroundColor: "#F2D98D",
        width: "100%",
        height: 150,
        top: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    resultContainer: {
        backgroundColor: "#000000",
    },
});

export default HomePage;
