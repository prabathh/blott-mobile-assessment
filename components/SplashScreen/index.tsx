import { View, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "@/hooks";
import { BlottIcon } from "@/theme/icon";

const SplashScreen = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.black,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.black}/>
      <BlottIcon />
    </View>
  );
};

export default SplashScreen;
