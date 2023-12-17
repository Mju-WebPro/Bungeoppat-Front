import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPage = ({ route, navigation }) => {
    const { searchKeyword } = route.params || {};
    const [markers, setMarkers] = useState([]);
    const initialRegion = {
        latitude: 37.580234738358605,
        longitude: 126.92282415743652,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const [region, setRegion] = useState(initialRegion);
    const [storeData, setStoreData] = useState([]);
    const [showStoreList, setShowStoreList] = useState(true);

    const toggleStoreList = () => {
        setShowStoreList((prev) => !prev);
    };

    useEffect(() => {
        if (searchKeyword) {
            handleSearch();
        } else {
            fetchStoreData();
        }
    }, [searchKeyword]);

    const fetchStoreData = async () => {
        try {
            const response = await fetch('http://192.168.0.6:8080/stores/all');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setStoreData(data);
        } catch (error) {
            console.error('Error fetching store data:', error);
        }
    };

    const handleSearch = () => {
        const backendEndpoint = `http://192.168.17.186:8080/places/search?keyword=${searchKeyword}`;

        fetch(backendEndpoint)
            .then((response) => response.json())
            .then((data) => {
                setMarkers(data);

                if (data.length > 0) {
                    const firstMarker = data[0];
                    setRegion({
                        latitude: firstMarker.latitude,
                        longitude: firstMarker.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const goStorePage = (item) => {
        console.log(item.storeName);
        navigation.navigate('StoreInfoPage', { item: item });
    }

    const handleReset = async () => {
        setMarkers([]);
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

    const handleAddressPress = () => {
        navigation.navigate('MapSearchPage');
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                {markers.slice(0, 3).map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.placeName}>
                        <Image
                            source={require('../images/fish.png')}
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'contain',
                            }}
                        />
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity style={styles.addressContainer} onPress={handleAddressPress}>
                <Text style={styles.addressText}>{searchKeyword}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Image source={require('../images/mapReset.png')} style={styles.resetImage} />
            </TouchableOpacity>
            <View style={styles.searchKeywordContainer}>
                <Text style={styles.searchKeywordText}></Text>
            </View>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleStoreList}>
                <Text style={styles.toggleButtonText}>
                    {showStoreList ? '+' : '-'}
                </Text>
            </TouchableOpacity>

            {showStoreList && (
                <View style={styles.storeListContainer}>
                    <FlatList
                        horizontal
                        data={storeData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.storeItem} onPress={() => goStorePage(item)}>
                                <View style={styles.storeItemContent}>
                                    <Text style={styles.storeItemText}>
                                        <Text style={styles.storeNameText}>{item.storeName}</Text>
                                        <Text>{`\n\nOPEN: ${item.operateTime}\n${item.menu}`}</Text>
                                    </Text>
                                    <Image
                                        source={require('../images/fish.png')}
                                        style={styles.fishImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchKeywordContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
    },
    searchKeywordText: {
        fontSize: 16,
    },
    addressContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: '90%',
        height: 60,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
        justifyContent: 'center',
    },
    addressText: {
        fontSize: 16,
    },
    resetButton: {
        position: 'absolute',
        bottom: 170,
        left: 10,
        zIndex: 1,
    },
    resetImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    storeListContainer: {
        position: 'absolute',
        top: '74%',
        width: '100%',
        height: 160,
        padding: 10,
    },
    toggleButton: {
        position: 'absolute',
        bottom: 170,
        right: 10,
        width: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 20,
        elevation: 4,
    },
    toggleButtonText: {
        fontSize: 19,
        left: 3,
        fontWeight: 'bold',
    },
    storeItem: {
        width: 240,
        padding: 25,
        marginRight: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.89)',
        borderRadius: 15,
    },
    storeItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    storeItemText: {
        padding: 5,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
        flex: 1,
        top: 5,
    },
    storeNameText: {
        color: 'orange',
        fontSize: 18,
    },
    fishImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginTop: -25,
    },
});

export default MapPage;

