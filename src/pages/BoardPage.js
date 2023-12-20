import { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image, ScrollView } from "react-native";
import CreateBoardModal from "./CreateBoardModal";
import RetrieveBoardModal from "./RetrieveBoardModal";

const BoardPage = ({}) => {
  const [createmodalVisible, setCreateModalVisible] = useState(false);
  const [retrievemodalVisible, setRetrieveModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    retrieveAllBoard().then(() => console.log("SUCCESS_RETRIEVE"));
  }, []);

  const retrieveAllBoard = async () => {
    fetch("http://ec2-3-35-203-41.ap-northeast-2.compute.amazonaws.com:8080/board/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
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
      <ScrollView>
      <View style={styles.boarder}>
        {boards &&
          boards.map((board) => (
            // <View style={styles.boardbar}>
              <TouchableOpacity
                style={styles.boardbar}
                onPress={() => openRetrieveModal(1)}
                // onPress={openRetrieveModal}
              >
                <View style={styles.titleLine}>
                  <Image
                    source={require("../images/fish.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                    <Text style={styles.titleText}>{board.title}</Text>
                    <Text style={styles.dateText}>{board.date}</Text>
                </View>
                </View>
              </TouchableOpacity>
            // </View>
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
      </ScrollView>
      <View>
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
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },

  button: {
    backgroundColor: '#F2D98D',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  boardbar: {
    borderWidth: 3,
    borderColor: "#F2D98D",
    width: 300,
    height: 100,
    // top: -250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 100,
  },
  titleLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 100,
  },
  titleText: {
    margin: 2,
    fontWeight: "bold",
    fontSize: 20,
  },
  dateText: {
    margin: 2,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default BoardPage;
