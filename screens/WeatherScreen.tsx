import { SafeAreaView, StatusBar, View } from "react-native";
import WeatherHeader from "@/components/weather-screen/WeatherHeader";
import WeatherBody from "@/components/weather-screen/WeatherBody";
import { styles } from "@/screens/styles/WeatherScreenStyles";
import { COLORS } from "@/constants/colors";

const WeatherScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDarkPurple}
      />
      <View style={styles.container}>
        <WeatherHeader />
        <WeatherBody />
      </View>
    </SafeAreaView>
  );
};

export default WeatherScreen;
