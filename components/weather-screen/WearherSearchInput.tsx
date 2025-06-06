import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles } from "@/components/weather-screen/styles/WeatherSearchInputStyles";
import { COLORS } from "@/constants/colors";

interface SearchInputProps {
  cityInput: string;
  setCityInput: (text: string) => void;
  handleSearchPress: () => void;
}

const WeatherSearchInput: React.FC<SearchInputProps> = ({
  cityInput,
  setCityInput,
  handleSearchPress,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Type city name"
        placeholderTextColor={COLORS.textLightGray}
        value={cityInput}
        onChangeText={setCityInput}
        onSubmitEditing={handleSearchPress}
        autoCapitalize="words"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeatherSearchInput;
