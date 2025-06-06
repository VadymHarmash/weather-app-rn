import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  cityName: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    color: COLORS.textWhite,
    marginBottom: 5,
  },
  temperature: {
    textAlign: "center",
    fontSize: 64,
    fontWeight: "200",
    color: COLORS.accentLightPurple,
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.textLightGray,
  },
});
