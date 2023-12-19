// WriteReviewPage.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Image, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WriteReviewPage = ({ route }) => {
  const navigation = useNavigation();
  // Access storeInfo and userInfo from the route.params
  const { storeInfo, userInfo, reviewInfo } = route.params;
  console.log(storeInfo, userInfo, reviewInfo)

  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(false);

  useEffect(() => {
    setRating(0);
    setReviewContent('');
  },  [navigation.isFocused()]);

  const submitReview = async () => {
    try {
      const reviewData = {
        reviewId: reviewInfo.id,
        starRating: rating,
        content: reviewContent,
      };

      // Make a POST request
      const response = await fetch('http://172.20.10.5:8080/review/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      // Handle the response as needed
      if (response.ok) {
        navigation.navigate('OrderListPage');
      } else {
        console.error('Failed to submit review:', response.statusText);
      }

      // Set showReviewInput to false after submitting the review
      setShowReviewInput(false);
    } catch (error) {
      console.error('Error during review submission:', error);
    }
  };

  const handleStarPress = (selectedRating) => {
    console.log('Selected Rating:', selectedRating);
    setRating(selectedRating);
    setShowReviewInput(true);
  };
  const handleReviewContentChange = (text) => {
    console.log('Review Content Change:', text);
    setReviewContent(text);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Image
            source={i <= rating ? require("../images/star_filled.png") : require("../images/star_outline.png")}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image
          source={require("../images/mainBar.png")}
          style={styles.headerimage}
        />
      </View>
      <View style={styles.reviewInfo}>
        <Text>{storeInfo.name} 음식의 리뷰를 남겨주세요!</Text>
      </View>
      <View style={styles.starsContainer}>{renderStars()}</View>
      {showReviewInput && (
        <View style={styles.reviewInputContainer}>
          <TextInput
            placeholder="리뷰를 작성해주세요!"
            multiline
            value={reviewContent}
            onChangeText={handleReviewContentChange}
            style={styles.reviewInput}
          />
          <Button title="리뷰 작성 완료" onPress={submitReview} />
        </View>
      )}
      <View style={styles.bottomBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF7DC",
        position: 'relative',
    },
    header: {
        height: 180,
        alignItems: "center",
        justifyContent: "center",
    },
    headerimage: {
        height: "110%",
        width: "100%",
    },
    starsContainer: {
        flexDirection: 'row', // Updated this line
        justifyContent: 'center',
        marginBottom: 20,
    },
    reviewInputContainer: {
        padding: 20,
    },
      reviewInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    reviewInfo: {
        padding: 20,
        alignItems: 'center',
      },
    star: {
        width: 40,
        height: 40,
        margin: 5,
    },
    bottomBar: {
        backgroundColor: "#F2D98D",
        height: 70,
        paddingVertical: 15,
        paddingHorizontal: 20,
        position: 'absolute', // Add this line
        bottom: 0, // Add this line
        left: 0, // Add this line
        right: 0, // Add this line
    },
});

export default WriteReviewPage;
