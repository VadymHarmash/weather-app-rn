import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
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
});
