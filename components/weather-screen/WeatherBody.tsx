import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherBodyStyles";
import { useAppSelector } from "@/store";
import { kelvinToCelsius } from "@/helpers/kelvinToCelsius";
import WeatherForecast from "@/components/weather-screen/WeatherForecast";

const WeatherBody = () => {
  const { weatherData } = useAppSelector((state) => state.weather);

  if (!weatherData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Weather data isn't exist.</Text>
      </View>
    );
  }

  const details = [
    {
      label: "Feels like",
      value: kelvinToCelsius(weatherData.main.feels_like),
    },
    {
      label: "Humidity",
      value: `${weatherData.main.humidity}%`,
    },
    {
      label: "Wind speed",
      value: `${weatherData.wind.speed.toFixed(1)} m/s`,
    },
    {
      label: "Pressure",
      value: `${weatherData.main.pressure} Pa`,
    },
    {
      label: "Visibility",
      value: `${(weatherData.visibility / 1000).toFixed(0)} km`,
    },
  ];

  return (
    <ScrollView
      style={styles.bodyContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        {weatherData && (
          <View style={styles.detailsGrid}>
            {details.map((item, index) => (
              <View key={index} style={styles.detailCard}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default WeatherBody;
