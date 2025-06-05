import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { COLORS } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";
import { kelvinToCelsius } from "@/helpers/kelvinToCelsius";
import * as Location from "expo-location";

const WeatherHeader = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { weatherData, status, error } = useAppSelector(
    (state) => state.weather,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError(
          "Дозвіл на доступ до місцезнаходження відхилено. Будь ласка, надайте дозвіл у налаштуваннях.",
        );
        setLocationLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});

        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (geocode && geocode.length > 0) {
          const city =
            geocode[0].city || geocode[0].subregion || geocode[0].name;
          if (city) {
            dispatch(fetchWeatherByCity(city));
          } else {
            setLocationError(
              "Не вдалося визначити місто за вашим місцезнаходженням.",
            );
          }
        } else {
          setLocationError("Не вдалося визначити місцезнаходження.");
        }
      } catch (err: any) {
        console.error("Помилка при отриманні місцезнаходження:", err);
        setLocationError(
          `Помилка отримання місцезнаходження: ${err.message || "Невідома помилка"}`,
        );
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);

  const handleSearchPress = () => {
    if (cityInput.trim()) {
      dispatch(fetchWeatherByCity(cityInput.trim()));
      setCityInput("");
    }
  };

  const renderSearchInput = () => (
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
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <Text style={styles.searchButtonText}>Пошук</Text>
      </TouchableOpacity>
    </View>
  );

  if (locationLoading) {
    return (
      <View style={styles.headerContainer}>
        {renderSearchInput()}
        <ActivityIndicator size="large" color={COLORS.textLightGray} />
        <Text style={{ color: COLORS.textLightGray, marginTop: 10 }}>
          Визначаємо ваше місцезнаходження...
        </Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.headerContainer}>
        {renderSearchInput()}
        <Text style={styles.errorText}>{locationError}</Text>
        <Text style={{ color: COLORS.textLightGray, marginTop: 10 }}>
          Будь ласка, введіть місто вручну.
        </Text>
      </View>
    );
  }

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
        <Text style={styles.searchButtonText}>
          Введіть місто для пошуку погоди.
        </Text>
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
