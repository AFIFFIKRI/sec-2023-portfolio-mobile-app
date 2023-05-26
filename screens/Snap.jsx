import { View } from "react-native";
import ImageCapture from "../components/ImageCapture";

function SnapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageCapture />
    </View>
  );
}

export default SnapScreen;
