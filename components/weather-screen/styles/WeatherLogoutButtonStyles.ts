import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    top: 10,
    right: 0,
    backgroundColor: COLORS.redColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: COLORS.textWhite,
    fontSize: 14,
    fontWeight: "bold",
  },
});
