import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { kelvinToCelsius } from "@/helpers/kelvinToCelsius";
import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

interface WeatherDisplayProps {
  weatherData: IWeatherDataEntry | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const cityName = weatherData.name;
  const currentTemperature = kelvinToCelsius(weatherData.main.temp);
  const description = weatherData.weather[0]?.description || "No description";
  const capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <View>
      <Text style={styles.cityName}>{cityName}</Text>
      <Text style={styles.temperature}>{currentTemperature}</Text>
      <Text style={styles.description}>{capitalizedDescription}</Text>
    </View>
  );
};

export default WeatherDisplay;
