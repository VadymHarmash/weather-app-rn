import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderPurple,
  },
  cityName: {
    fontSize: 38,
    fontWeight: "bold",
    color: COLORS.textWhite,
    marginBottom: 5,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "200",
    color: COLORS.accentLightPurple,
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: COLORS.textLightGray,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 15,
    color: COLORS.textWhite,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: COLORS.accentLightPurple,
    paddingHorizontal: 20,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    top: 0,
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
