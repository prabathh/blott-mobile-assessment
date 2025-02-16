import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "@/hooks";

interface SplitLayoutProps {
  children: React.ReactNode;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ children }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 181,
      backgroundColor: theme.colors.background,
    },
    bottomBackground: {
      position: "absolute",
      top: 181,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.black,
    },
    content: {
      flex: 1,
      zIndex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background}/>
      {/* Background layers */}
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      {/* Content layer */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default SplitLayout;
