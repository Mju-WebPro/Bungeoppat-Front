import { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import CreateBoardModal from "./CreateBoardModal";
import { retrieveAllBoard } from "../component/axios/Board";

const BoardPage = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    retrieveAllBoard().then((res) => {
      // console.log(res);
      // console.log(res.data);
      console.log(res.data.data);
      setBoards(res.data.data);
    });
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>게시판</Text>
      </View>
      <View style={styles.boarder}>
        {boards.map((board) => (
          <View>
            <Text style={styles.title}>{board.title}</Text>
            <Text style={styles.title}>{board.content}</Text>
          </View>
        ))}
        <CreateBoardModal modalVisible={modalVisible} closeModal={closeModal} />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>게시글 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7DC",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 100,
    backgroundColor: "#F2D98D",
    width: "100%",
    top: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  boarder: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  bottomBar: {
    backgroundColor: "#F2D98D",
    width: "100%",
    height: 150,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    margin: 10,
  },
});

export default BoardPage;
