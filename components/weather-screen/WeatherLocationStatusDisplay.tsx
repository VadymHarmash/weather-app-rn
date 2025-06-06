import React from "react";
import { Text, ActivityIndicator } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { COLORS } from "@/constants/colors";
import { IWeatherDataEntry } from "@/interfaces/IWeatherData.interface";

interface LocationStatusDisplayProps {
  locationLoading: boolean;
  locationError: string | null;
  status: "idle" | "loading" | "succeeded" | "failed" | null;
  error: string | null;
  weatherData: IWeatherDataEntry | null;
}

const WeatherLocationStatusDisplay: React.FC<LocationStatusDisplayProps> = ({
  locationLoading,
  locationError,
  status,
  error,
  weatherData,
}) => {
  if (locationLoading) {
    return (
      <>
        <ActivityIndicator size="large" color={COLORS.textLightGray} />
        <Text style={{ color: COLORS.textLightGray, marginTop: 10 }}>
          Finding your location...
        </Text>
      </>
    );
  }

  if (locationError) {
    return (
      <>
        <Text style={styles.errorText}>{locationError}</Text>
        <Text style={{ color: COLORS.textLightGray, marginTop: 10 }}>
          Write city to see weather.
        </Text>
      </>
    );
  }

  if (status === "loading") {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  if (status === "failed") {
    return (
      <>
        <Text style={styles.errorText}>{error || "Error data loading."}</Text>
      </>
    );
  }

  if (!weatherData) {
    return (
      <>
        <Text style={styles.searchButtonText}>Type city name.</Text>
      </>
    );
  }
};

export default WeatherLocationStatusDisplay;
