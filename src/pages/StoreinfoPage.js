import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

const StoreinfoPage = ({ route, navigation }) => {
  const { item } = route.params || {};
  const handleSearch = () => {
    console.log(item.storeName);
    navigation.navigate('OrderPage', { item: item });
  };

  return (
    <View style={styles.container}>
        <Image source={require('../images/sideBar.png')} style={styles.sideBar} />
        {/* <Image source={require('../images/fish.png')}
                                        style={styles.fishImage}/> */}
        <Text style={styles.storeNameText}>{item.storeName}</Text>
        <View style={styles.blackRectangle}>
            <Text style={styles.boxText}>가게 정보{'\n'}
                <Text>{`\nOPEN: ${item.operateTime}\n`}</Text>
                <Text>{`메뉴: ${item.menu}\n`}</Text>

            </Text>
        </View>
        <Pressable style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>주문하기</Text>
        </Pressable>
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
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: -310,
    resizeMode: 'contain',
},
blackRectangle: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 350,
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
},
boxText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
},
storeNameText: {
    color: 'orange',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
