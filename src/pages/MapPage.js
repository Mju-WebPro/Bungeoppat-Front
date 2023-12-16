import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Button, TouchableOpacity, FlatList, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const MapPage = () => {
    const [markers, setMarkers] = useState([]);
    const initialRegion = {
        latitude: 37.580234738358605,
        longitude: 126.92282415743652,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    const [searchKeyword, setSearchKeyword] = useState('');
    const [region, setRegion] = useState(initialRegion);
    const [storeData, setStoreData] = useState([]);
    useEffect(() => {
        fetchStoreData();
    }, []);

    const fetchStoreData = async () => {
        try {
            const response = await fetch('http://192.168.219.107:8080/stores/all');
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
        const backendEndpoint = `http://192.168.219.107:8080/places/search?keyword=${searchKeyword}`;

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

    const handleReset = () => {
        setMarkers([]);
        setRegion(initialRegion);
        setSearchKeyword('');
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                {markers.map((marker, index) => (
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

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="검색어를 입력하세요"
                    onChangeText={(text) => setSearchKeyword(text)}
                    value={searchKeyword}
                />
                <Button title="검색" onPress={handleSearch} />
            </View>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Image source={require('../images/mapReset.png')} style={styles.resetImage} />
            </TouchableOpacity>
            <View style={styles.storeListContainer}>
                <FlatList
                    horizontal
                    data={storeData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.storeItem}>
                            <Text style={styles.storeItemText}>
                                <Text style={styles.storeNameText}>{item.storeName}</Text>
                                <Text>{`\n\n영업 시간: ${item.operateTime}\n${item.menu}`}</Text>
                            </Text>
                        </TouchableOpacity>
                    )}
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
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: "90%",
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        marginRight: 10,
    },
    resetButton: {
        position: 'absolute',
        bottom: 165,
        left: 10,
        zIndex: 1,
    },
    resetImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    storeListContainer: {
        position: 'absolute',
        top: '75%',
        width: '100%',
        height: 160,
        padding: 10,
    },
    storeItem: {
        width: 240,
        padding: 25,
        marginRight: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 8,
    },
    storeItemText: {
        padding: 5,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14, // 원하는 크기로 조정 가능
    },
    storeNameText: {
        color: 'darkgray', // 원하는 색상으로 변경 가능
        fontSize: 18, // 가게 이름의 폰트 크기를 18로 지정 (원하는 크기로 조정 가능)
    },
});

export default MapPage;
