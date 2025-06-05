import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.primaryDarkPurple,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkPurple,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
