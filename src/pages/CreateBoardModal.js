import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBoard } from "../component/axios/Board";

const CreateBoardModal = ({ modalVisible, closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const cancle = () => {
    closeModal();
  };

  const getUserId = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const data = JSON.parse(userData);
      userId = data.userId;
      return userId;
    }
  };

  const handleSave = async () => {
    const userId = await getUserId();
    const boardRequestDto = {
      userId: userId,
      title: title,
      content: content,
    };
    console.log("notImage:", boardRequestDto);
    createBoard(boardRequestDto).then(() => console.log("SUCCESS"));
    closeModal();
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
