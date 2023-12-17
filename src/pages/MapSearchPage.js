import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';

const MapSearchPage = ({ navigation }) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = () => {
        navigation.navigate('MainPage', { searchKeyword: searchKeyword });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // 필요에 따라 조정
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="검색어를 입력하세요"
                    onChangeText={(text) => setSearchKeyword(text)}
                    value={searchKeyword}
                    autoFocus={true}
                />
                <Button title="검색" onPress={handleSearch} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF7DC',
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
});

export default MapSearchPage;
