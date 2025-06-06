import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherHeaderStyles";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useAppDispatch } from "@/store";
import { resetWeatherState } from "@/store/slices/weather.slice";

const WeatherLogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      dispatch(resetWeatherState());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default WeatherLogoutButton;
