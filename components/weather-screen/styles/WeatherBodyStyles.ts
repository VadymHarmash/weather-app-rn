import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textWhite,
    marginBottom: 15,
    textAlign: "center",
  },
  forecastCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
  },
  forecastDay: {
    fontSize: 18,
    color: COLORS.textWhite,
    flex: 1,
  },
  forecastTemp: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.accentLightPurple,
    marginHorizontal: 10,
  },
  forecastDescription: {
    fontSize: 16,
    color: COLORS.textLightGray,
    flex: 1.5,
    textAlign: "right",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.textLightGray,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textWhite,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textLightGray,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDarkPurple,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
