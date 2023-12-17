import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createBoard } from "../component/axios/Board";

const CreateBoardModal = ({ modalVisible, closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const cancle = () => {
    setSelectedImage(null);
    closeModal();
  };

  const handleSave = async () => {
    let formData = null;
    if (selectedImage) {
      formData = await createFormData(selectedImage);
    }

    if (formData || !selectedImage) {
      createBoard(title, content, formData).then(() =>
        alert("게시판 생성 성공")
      );
      setSelectedImage(null);
      closeModal();
    } else {
      console.log("이미지를 선택하세요.");
    }
  };

  const createFormData = async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    return formData;
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.titleInput}
            placeholder="제목"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={[styles.contentInput, { height: 200 }]}
            placeholder="내용"
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline={true}
            textAlignVertical="top"
          />
          {selectedImage && (
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 240, height: 200, marginBottom: 20 }}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: -15, right: 30 }}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.button}>
            <TouchableOpacity style={styles.saveButton} onPress={uploadImage}>
              <Text style={styles.saveButtonText}>이미지</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <View style={styles.space} />
            <TouchableOpacity style={styles.cancleButton} onPress={cancle}>
              <Text style={styles.cancleButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  cancleButton: {
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  cancleButtonText: {
    color: "black",
    fontWeight: "bold",
    margin: 10,
  },
  space: {
    width: 10,
  },
});

export default CreateBoardModal;
