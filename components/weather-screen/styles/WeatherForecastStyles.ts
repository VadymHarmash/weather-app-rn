import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primaryDarkPurple,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.textWhite,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: COLORS.textLightGray,
  },
  card: {
    width: 120,
    marginRight: 10,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: COLORS.primaryDarkPurple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  cardDay: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textWhite,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.textLightGray,
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  cardTemp: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.accentLightPurple,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.textLightGray,
  },
});
