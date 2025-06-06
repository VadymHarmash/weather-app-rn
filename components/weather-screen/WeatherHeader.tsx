import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";
import * as Location from "expo-location";
import WeatherLogoutButton from "@/components/weather-screen/WeatherLogoutButton";
import WeatherLocationStatusDisplay from "@/components/weather-screen/WeatherLocationStatusDisplay";
import WeatherDisplay from "@/components/weather-screen/WeatherDisplay";
import WeatherSearchInput from "@/components/weather-screen/WearherSearchInput";

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
          "You rejected location permission. Change it in settings to see the weather in your region",
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
            setLocationError("Error getting location.");
          }
        } else {
          setLocationError("Error getting location.");
        }
      } catch (err: any) {
        console.error("Error getting location:", err);
        setLocationError(
          `Error getting location: ${err.message || "Unexpected error"}`,
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

  return (
    <View style={styles.headerContainer}>
      <WeatherLogoutButton />
      <WeatherSearchInput
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleSearchPress={handleSearchPress}
      />
      <WeatherLocationStatusDisplay
        locationLoading={locationLoading}
        locationError={locationError}
        status={status}
        error={error}
        weatherData={weatherData}
      />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </View>
  );
};

export default WeatherHeader;
