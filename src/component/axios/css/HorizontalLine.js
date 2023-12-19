import { View, StyleSheet } from "react-native";

const HorizontalLine = () => {
  return <View style={styles.line}></View>;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HorizontalLine;
