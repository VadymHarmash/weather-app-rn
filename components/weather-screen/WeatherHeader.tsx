import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchWeatherByCity } from "@/store/thunks/weather.thunk";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import WeatherLogoutButton from "@/components/weather-screen/WeatherLogoutButton";
import WeatherLocationStatusDisplay from "@/components/weather-screen/WeatherLocationStatusDisplay";
import WeatherDisplay from "@/components/weather-screen/WeatherDisplay";
import WeatherSearchInput from "@/components/weather-screen/WearherSearchInput";
import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

const WeatherHeader = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string | null>(null);

  const { weatherData, status, error } = useAppSelector(
    (state) => state.weather,
  );
  const dispatch = useAppDispatch();

  const saveWeatherDataToCache = async (data: IWeatherDataEntry) => {
    try {
      const dataToStore = {
        weatherData: data,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem(
        "cachedWeatherData",
        JSON.stringify(dataToStore),
      );
    } catch (e) {
      console.error("Failed to save weather data to cache", e);
    }
  };

  const loadWeatherDataFromCache = async () => {
    try {
      const cachedDataString = await AsyncStorage.getItem("cachedWeatherData");
      if (cachedDataString) {
        const { weatherData: cachedData, timestamp } =
          JSON.parse(cachedDataString);
        dispatch({
          type: "weather/fetchWeatherByCity/fulfilled",
          payload: cachedData,
        });
        setLastUpdatedTime(timestamp);
        return cachedData;
      }
    } catch (e) {
      console.error("Failed to load weather data from cache", e);
    }
    return null;
  };

  useEffect(() => {
    let unsubscribeNetInfo: (() => void) | undefined;

    const loadLocationAndWeatherData = async (isConnected: boolean | null) => {
      setLocationLoading(true);
      setLocationError(null);
      setIsOffline(!isConnected);

      try {
        const storedCity = await SecureStore.getItemAsync("lastKnownCity");
        if (storedCity) {
          if (isConnected) {
            dispatch(fetchWeatherByCity(storedCity));
          }
        }
      } catch (e) {
        console.error("Error loading stored city:", e);
      }

      if (isConnected) {
        try {
          let { status: permissionStatus } =
            await Location.requestForegroundPermissionsAsync();
          if (permissionStatus !== "granted") {
            setLocationError(
              "You rejected location permission. Change it in settings to see the weather in your region",
            );
            setLocationLoading(false);
            return;
          }

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
              await SecureStore.setItemAsync("lastKnownCity", city);
            } else {
              setLocationError("Error getting location. City not found.");
            }
          } else {
            setLocationError("Error getting location. Geocoding failed.");
          }
        } catch (err: unknown) {
          console.error("Error getting current location:", err);
          if (err instanceof Error) {
            setLocationError(
              `Error getting current location: ${err.message || "Unexpected error"}`,
            );
          } else {
            setLocationError(
              "Error getting current location: An unknown error occurred.",
            );
          }
        } finally {
          setLocationLoading(false);
        }
      } else {
        const cached = await loadWeatherDataFromCache();
        if (!cached) {
          setLocationError(
            "No internet connection and no cached data available.",
          );
        }
        setLocationLoading(false);
      }
    };

    unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected;
      setIsOffline(!isConnected);
      loadLocationAndWeatherData(isConnected);
    });

    return () => {
      if (unsubscribeNetInfo) {
        unsubscribeNetInfo();
      }
    };
  }, []);

  useEffect(() => {
    if (status === "succeeded" && weatherData) {
      saveWeatherDataToCache(weatherData);
      setLastUpdatedTime(new Date().toISOString());
    }
  }, [status, weatherData]);

  const handleSearchPress = () => {
    if (cityInput.trim()) {
      if (!isOffline) {
        dispatch(fetchWeatherByCity(cityInput.trim()));
        SecureStore.setItemAsync("lastKnownCity", cityInput.trim()).catch(
          (e) => {
            console.error("Failed to save searched city to SecureStore:", e);
          },
        );
        setCityInput("");
      } else {
        setLocationError(
          "Cannot search for new weather without internet connection.",
        );
      }
    }
  };

  const formatLastUpdatedTime = (isoString: string) => {
    const date = new Date(isoString);
    return `Last updated: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.headerContainer}>
      <WeatherLogoutButton />
      <WeatherSearchInput
        cityInput={cityInput}
        setCityInput={setCityInput}
        handleSearchPress={handleSearchPress}
      />
      {isOffline && (
        <Text
          style={{ color: "orange", textAlign: "center", marginVertical: 5 }}
        >
          No internet connection. Displaying cached data.
        </Text>
      )}
      {weatherData && lastUpdatedTime && isOffline && (
        <Text style={{ color: "gray", textAlign: "center", fontSize: 12 }}>
          {formatLastUpdatedTime(lastUpdatedTime)}
        </Text>
      )}
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
