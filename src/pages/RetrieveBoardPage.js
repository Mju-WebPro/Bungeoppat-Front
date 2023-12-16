import { retrieveBoardById } from "../component/axios/Board";
import { useEffect, useState } from "react";

const RetrieveBoardPage = () => {
  const [board, setBoard] = useState();

  useEffect(() => {
    retrieveBoardById().then((res) => {
      setBoard(res.data.data);
    });
  });

  return (
    <View>
      <Text>Board: {board.title}</Text>
    </View>
  );
};

export default RetrieveBoardPage;
