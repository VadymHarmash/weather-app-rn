import { View } from "react-native";
import WeatherScreen from "@/screens/WeatherScreen";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <WeatherScreen />
        </View>
    );
}
