
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import theme from "@/theme";
import { NotifyIcon } from "@/theme/icon";
import { Gap } from "@/components/common/Gap";

const Notification = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const handleContinue = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status) {
        router.push("/Dashboard");
      }
    } catch (error) {
      console.error("Error", "Failed to request notification permissions.");
    }
  };

  return (
    <SafeAreaView style={[styles.container, !isMobile && styles.containerWeb]}>
      <View style={[styles.contentWeb, isMobile && styles.content]}>
        <NotifyIcon />
        <Gap size="md" vertical />
        <Text style={styles.title}>Get the most out of Blott ✅</Text>
        <Gap size="sm" vertical />
        <Text style={styles.detail}>
          Allow notifications to stay in the loop with your payments, requests
          and groups.
        </Text>
      </View>
      <TouchableOpacity style={[styles.btn, !isMobile && styles.btnWeb]} onPress={handleContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
      <Gap size="sm" vertical />
    </SafeAreaView>
  );
};

export default Notification;

const { colors, spacing, text, button } = theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
  containerWeb: {
    alignItems: 'center',
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  contentWeb: {
    alignItems: "center",
    maxWidth: 600,
  },
  title: {
    fontSize: text.size.lg,
    fontWeight: text.weight.bold,
    lineHeight: text.size.xl,
    color: text.color.primary,
  },
  detail: {
    fontSize: text.size.sm,
    fontWeight: text.weight.normal,
    lineHeight: text.size.lg,
    color: text.color.secondary,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: button.primary,
    borderRadius: theme.spacing.md,
    justifyContent: "center",
  },
  btnWeb: {
    maxWidth: 600,
    marginTop: spacing.md
  },
  btnText: {
    fontSize: text.size.sm,
    fontWeight: text.weight.medium,
    color: text.color.white,
    textAlign: "center",
  },
});
