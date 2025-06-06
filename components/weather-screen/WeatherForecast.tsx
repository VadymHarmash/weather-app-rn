import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useAppSelector } from "@/store";
import { styles } from "@/components/weather-screen/styles/WeatherForecastStyles";

const WeatherForecast = () => {
  const { forecast } = useAppSelector((state) => state.weather);

  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>No forecast data available.</Text>
      </SafeAreaView>
    );
  }

  const dailyForecasts: { [key: string]: (typeof forecast.list)[0] } = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    if (!dailyForecasts[day]) {
      dailyForecasts[day] = item;
    }
  });

  const forecastEntries = Object.values(dailyForecasts);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastEntries.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const tempCelsius = (item.main.temp - 273.15).toFixed(0);

          const weatherIcon = item.weather[0]?.icon
            ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
            : null;

          return (
            <View key={index} style={styles.card}>
              <Text style={styles.cardDay}>{dayName}</Text>
              <Text style={styles.cardDate}>{date.toLocaleDateString()}</Text>
              {weatherIcon && (
                <Image
                  source={{ uri: weatherIcon }}
                  style={styles.weatherIcon}
                />
              )}
              <Text style={styles.cardTemp}>{tempCelsius}°C</Text>
              <Text style={styles.cardDescription}>
                {item.weather[0]?.description || ""}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherForecast;
