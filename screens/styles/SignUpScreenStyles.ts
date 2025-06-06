import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkPurple,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  keyboardContainer: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textWhite,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    color: COLORS.textWhite,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.borderPurple,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: COLORS.accentLightPurple,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    width: "100%",
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.borderPurple,
  },
  buttonSecondaryText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
});
