import { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import CreateBoardModal from "./CreateBoardModal";
import RetrieveBoardModal from "./RetrieveBoardModal";

const BoardPage = ({}) => {
  const [createmodalVisible, setCreateModalVisible] = useState(false);
  const [retrievemodalVisible, setRetrieveModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    retrieveAllBoard().then(console.log("SUCCESS_RETRIEVE"));
  }, []);

  const retrieveAllBoard = async () => {
    fetch("http://172.20.10.5:8080/board/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(1, res);
        console.log(2, res.data);
        console.log(3, res.data.data);
        setBoards(res.data);
      });
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  // const openRetrieveModal = (boardid) => {
  const openRetrieveModal = () => {
    setRetrieveModalVisible(true);
  };

  const closeRetrieveModal = () => {
    setRetrieveModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>게시판</Text>
      </View>
      <View style={styles.boarder}>
        <TouchableOpacity
          style={styles.boardbar}
          // onPress={openRetrieveModal(board.id)}
          onPress={openRetrieveModal}
        >
          <View style={styles.titleLine}>
            <Image
              source={require("../images/fish.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={styles.titleText}>writer</Text>
            <Text style={styles.titleText}>title</Text>
            <Text style={styles.titleText}>date</Text>
          </View>
        </TouchableOpacity>
        {boards &&
          boards.map((board) => (
            <View style={styles.boardbar}>
              <TouchableOpacity
                style={styles.boardbar}
                // onPress={openRetrieveModal(board.id)}
                onPress={openRetrieveModal}
              >
                <View style={styles.titleLine}>
                  <Image
                    source={require("../images/fish.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.titleText}>writer</Text>
                  <Text style={styles.titleText}>title</Text>
                  <Text style={styles.titleText}>date</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        <CreateBoardModal
          modalVisible={createmodalVisible}
          closeModal={closeCreateModal}
        />
        <RetrieveBoardModal
          modalVisible={retrievemodalVisible}
          closeModal={closeRetrieveModal}
        />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={openCreateModal}>
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
    fontSize: 30,
    marginTop: 40,
  },
  boarder: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  bottomBar: {
    backgroundColor: "#F2D98D",
    width: "100%",
    height: 100,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#FFF7DC",
    marginBottom: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    margin: 10,
  },
  boardbar: {
    borderWidth: 1,
    borderColor: "#F2D98D",
    width: 300,
    height: 50,
    top: -250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 100,
  },
  titleLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    margin: 2,
    fontWeight: "bold",
  },
});

export default BoardPage;
