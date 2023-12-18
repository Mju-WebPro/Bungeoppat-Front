import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const StoreinfoPage = ({ route, navigation }) => {
  const { item } = route.params || {};
    const initialRegion = {
    storeName:item.storeName,
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    };

    const [region, setRegion] = useState(initialRegion);
  const handleOrder = () => {
    console.log(item.storeName);
    navigation.navigate('OrderPage', { item: item });
  };
  const handleReset = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};
  return (
    <View style={styles.container}>
        <Image source={require('../images/sideBar.png')} style={styles.sideBar} />
        <View style={styles.nameContainer}>
        <Image source={require('../images/smallfish.png')}
                                        style={styles.fishImage}/>
        <Text style={styles.storeNameText}>{initialRegion.storeName}</Text>
        </View>

        <MapView style={styles.map} region={region}>
                    <Marker
                        coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                        title={initialRegion.storeName}>
                        <Image
                            source={require('../images/fish.png')}
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain',
                            }}
                        />
                    </Marker>
                
            </MapView>
        <View style={styles.blackRectangle}>
            <Text style={styles.boxText}>
                {`OPEN: ${item.operateTime}\n메뉴: ${item.menu}\n`}
            </Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Image source={require('../images/mapReset.png')} style={styles.resetImage} />
            </TouchableOpacity>
        <Pressable style={styles.button} onPress={handleOrder}>
                <Text style={styles.buttonText}>주문하기</Text>
        </Pressable>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
},
map: {
    width: '90%',
    height: '30%',
    borderRadius: 30,
},
sideBar: {
    height: 180,
    width: '100%',
    marginTop:20,
    resizeMode: 'contain',
},
nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
fishImage:{
    resizeMode: 'contain',
    width: 50,
    height: 50,
    marginRight:10,
    marginBottom:10,
},
storeNameText: {
    color: 'orange',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
},
resetButton: {
        position: 'absolute',
        bottom: 340,
        left: 350,
        zIndex: 1,
},
resetImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
},
blackRectangle: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 350,
    height: 200,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop:20,
},
boxText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
},
button: {
    backgroundColor: 'orange',
    marginTop:10,
    padding: 10,
    paddingHorizontal: 26,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },

});

export default StoreinfoPage;
