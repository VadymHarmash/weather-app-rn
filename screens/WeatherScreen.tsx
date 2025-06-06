import { SafeAreaView, StatusBar, View, ScrollView } from "react-native";
import WeatherHeader from "@/components/weather-screen/WeatherHeader";
import WeatherBody from "@/components/weather-screen/WeatherBody";
import { styles } from "@/screens/styles/WeatherScreenStyles";
import { COLORS } from "@/constants/colors";
import WeatherForecast from "@/components/weather-screen/WeatherForecast";
import React from "react";

const WeatherScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDarkPurple}
      />
      <ScrollView>
        <View style={styles.container}>
          <WeatherHeader />
          <WeatherBody />
          <WeatherForecast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;
