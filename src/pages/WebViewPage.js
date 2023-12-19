import React, { useEffect } from 'react';
import { WebView } from "react-native-webview";

const WebViewPage = ({ route, navigation }) => {
    const { uri, selectedMinutes, quantityPap, quantityCream, item } = route.params || {};
    console.log("Received parameters:");
    console.log("uri:", uri);
    console.log("selectedMinutes:", selectedMinutes);
    console.log("quantityPap:", quantityPap);
    console.log("quantityCream:", quantityCream);
    console.log("item:", item);

    // useEffect를 사용하여 페이지가 로드된 후 1초 후에 TicketPage로 이동
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("TicketPage", {
                selectedMinutes: selectedMinutes,
                quantityPap: quantityPap,
                quantityCream: quantityCream,
                item: item,
            });
        }, 1000);

        // 컴포넌트가 언마운트되면 타이머를 클리어
        return () => clearTimeout(timer);
    }, [navigation, selectedMinutes, quantityPap, quantityCream, item]);

    return (
        <WebView
            source={{ uri }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />
    );
};

export default WebViewPage;
