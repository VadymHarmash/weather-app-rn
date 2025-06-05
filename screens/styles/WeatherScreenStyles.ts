import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
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
