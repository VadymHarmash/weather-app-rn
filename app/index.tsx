import { View } from "react-native";
import SignUpScreen from "@/screens/SignUpScreen";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignUpScreen />
    </View>
  );
}
