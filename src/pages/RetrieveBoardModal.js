import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import HorizontalLine from "../component/axios/css/HorizontalLine";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RetrieveBoardModal = ({ modalVisible, closeModal, id }) => {
  const [board, setBoard] = useState();
  const [existReply, setExistReply] = useState();
  const [reply, setReply] = useState();

  useEffect(() => {
    retrieveBoardById().then(console.log("SUCCESS_RETRIEVE"));
    retrieveReply().then(console.log("SUCCESS_REPLY_RETRIEVE"));
  });

  const retrieveBoardById = async () => {
    fetch("http://192.168.123.109:8080/board/{id}", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setBoard(res.data);
      });
  };

  const retrieveReply = async () => {
    fetch("http://192.168.123.109:8080/reply/{id}", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        setExistReply(res.data);
      });
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
    const replyRequest = {
      boardId: "1234",
      userId: userId,
      replyContent: reply,
    };
    console.log("data:", replyRequest);
    createReply(replyRequest).then(console.log("REPLY_SUCCESS"));
  };

  const createReply = async (replyRequest) => {
    fetch("http://192.168.123.109:8080/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(replyRequest),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalTitle}>
          <Text style={styles.titleLine}>게시글 제목</Text>
          <Text>TEST TITLE</Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.contentLine}>게시글 내용</Text>
          <Text>TEST CONTENT</Text>
          <TextInput
            style={[styles.replyInput, { width: 270 }]}
            placeholder="댓글"
            value={reply}
            onChangeText={(text) => setReply(text)}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Image
              source={require("../images/talkIcon.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <HorizontalLine />
          <Text style={styles.replyText}> TEST </Text>
          {existReply &&
            existReply.map((reple) => (
              <View>
                <Text style={styles.replyText}> {reple.replyContent} </Text>
              </View>
            ))}
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
  modalTitle: {
    backgroundColor: "#FFF7DC",
    top: -100,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: "80%",
  },
  titleLine: {
    padding: 10,
    marginBottom: 10,
  },
  modalContent: {
    top: -100,
    backgroundColor: "#FFF7DC",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  contentLine: {
    padding: 10,
    marginBottom: 10,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "white",
    padding: 10,
    // borderWidth: 1,
    // borderRadius: 100,
    width: 50,
    alignItems: "center",
  },
  saveButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  replyText: {
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
  },
  space: {
    width: 10,
  },
});

export default RetrieveBoardModal;
