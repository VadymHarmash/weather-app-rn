import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { COLORS } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";

const kelvinToCelsius = (kelvin: number): string => {
  return kelvin ? (kelvin - 273.15).toFixed(0) + "°C" : "";
};

const WeatherHeader = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const { weatherData, status, error } = useAppSelector(
    (state) => state.weather,
  );
  const dispatch = useAppDispatch();

  const handleSearchPress = () => {
    if (cityInput.trim()) {
      dispatch(fetchWeatherByCity(cityInput.trim()));
      console.log(weatherData);
      setCityInput("");
    }
  };

  if (status === "loading") {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Введіть назву міста"
            placeholderTextColor={COLORS.textLightGray}
            value={cityInput}
            onChangeText={setCityInput}
            onSubmitEditing={handleSearchPress}
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchButtonText}>Пошук</Text>
          </TouchableOpacity>
        </View>
        <Text>Завантаження...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Введіть назву міста"
            placeholderTextColor={COLORS.textLightGray}
            value={cityInput}
            onChangeText={setCityInput}
            onSubmitEditing={handleSearchPress}
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchButtonText}>Пошук</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>
          {error || "Помилка завантаження даних."}
        </Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Введіть назву міста"
            placeholderTextColor={COLORS.textLightGray}
            value={cityInput}
            onChangeText={setCityInput}
            onSubmitEditing={handleSearchPress}
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchButtonText}>Пошук</Text>
          </TouchableOpacity>
        </View>
        <Text>Введіть місто для пошуку погоди.</Text>
      </View>
    );
  }

  const cityName = weatherData.name;
  const currentTemperature = kelvinToCelsius(weatherData.main.temp);
  const description = weatherData.weather[0]?.description || "Немає опису";
  const capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Введіть назву міста"
          placeholderTextColor={COLORS.textLightGray}
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={handleSearchPress}
          autoCapitalize="words"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPress}
        >
          <Text style={styles.searchButtonText}>Пошук</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.cityName}>{cityName}</Text>
        <Text style={styles.temperature}>{currentTemperature}</Text>
        <Text style={styles.description}>{capitalizedDescription}</Text>
      </View>
    </View>
  );
};

export default WeatherHeader;
