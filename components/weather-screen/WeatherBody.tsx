import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherBodyStyles";
import { useAppSelector } from "@/store";

const kelvinToCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(0) + "°C";
};

const WeatherBody = () => {
  const { weatherData } = useAppSelector((state) => state.weather);

  if (!weatherData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Дані про погоду відсутні.</Text>
      </View>
    );
  }

  const details = [
    {
      label: "Відчувається як",
      value: kelvinToCelsius(weatherData.main.feels_like),
    },
    {
      label: "Вологість",
      value: `${weatherData.main.humidity}%`,
    },
    {
      label: "Вітер",
      value: `${weatherData.wind.speed.toFixed(1)} м/с`,
    },
    {
      label: "Тиск",
      value: `${weatherData.main.pressure} гПа`,
    },
    {
      label: "Видимість",
      value: `${(weatherData.visibility / 1000).toFixed(0)} км`,
    },
  ];

  return (
    <ScrollView
      style={styles.bodyContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Деталі сьогодні</Text>
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
