import { retrieveBoardById } from "../component/axios/Board";
import { useEffect, useState } from "react";
import { Modal } from "react-native";

const RetrieveBoardPage = ({ modalVisible, closeModal }) => {
  const [board, setBoard] = useState();

  useEffect(() => {
    retrieveBoardById().then((res) => {
      setBoard(res.data.data);
    });
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    ></Modal>
  );
};

export default RetrieveBoardPage;
