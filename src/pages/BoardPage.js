import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

const BoardPage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    getBoards();
  });

  const renderBoards = ({ board }) => {
    <View style={StyleSheet.postItem}>
      <Text>{item.title}</Text>
    </View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderBoards}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BoardPage;
