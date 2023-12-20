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
        reviewId: reviewInfo,
        starRating: rating,
        content: reviewContent,
      };

      // Make a POST request
      const response = await fetch('http://ec2-3-35-203-41.ap-northeast-2.compute.amazonaws.com:8080/review/write', {
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
          source={require("../images/sideBar.png")}
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
          <TouchableOpacity onPress={submitReview} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>리뷰 작성 완료</Text>
          </TouchableOpacity>
        </View>
      )}
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
        height: 150,
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
    submitButton: {
      backgroundColor: '#FFA50090',
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 50,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default WriteReviewPage;
