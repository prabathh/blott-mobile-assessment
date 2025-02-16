import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "@/theme";
import { useUserData, useTheme } from "@/hooks";
import { Gap } from "@/components/common/Gap";
import { ChevronIcon } from "@/theme/icon";

const LegalName = () => {
  const router = useRouter();
  const theme = useTheme();
  const { saveUserData } = useUserData();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const lastNameRef = useRef<TextInput>(null);
  const { width } = useWindowDimensions();
  const disabled = !(firstName && lastName);
  const isMobile = width < 600;

  const handleContinue = async () => {
    if (firstName.trim() && lastName.trim()) {
      await saveUserData(firstName, lastName);
      router.push("/Notification");
    }
  };

  const Container = isMobile ? SafeAreaView : View;

  return (
    <Container style={styles.flex}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        enabled={isMobile}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Your legal name</Text>
          <Gap size="sm" vertical />
          <Text style={styles.detail}>
            We need to know a bit about you so that we can create your account.
          </Text>
          <Gap size="md" vertical />
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor={theme.text.color.tertiary}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
          />
          <Gap size="md" vertical />
          <TextInput
            ref={lastNameRef}
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor={theme.text.color.tertiary}
            returnKeyType="next"
            onSubmitEditing={handleContinue}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={[styles.btn, disabled && styles.disabledBtn]}
            disabled={disabled}
            onPress={handleContinue}
          >
            <ChevronIcon />
          </TouchableOpacity>
          <Gap size="md" vertical />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LegalName;

const { colors, spacing, text, border, button } = theme;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: Platform.select({ native: "flex-start", default: "center" }),
    justifyContent: Platform.select({ native: "space-between", default: "center" }),
    paddingHorizontal: spacing.md,
  },
  content: {
    width: "100%",
    maxWidth: 600,
  },
  title: {
    fontSize: text.size.xl,
    fontWeight: text.weight.bold,
    color: text.color.primary,
    paddingVertical: spacing.xs,
  },
  detail: {
    fontSize: text.size.sm,
    fontWeight: text.weight.normal,
    color: text.color.secondary,
    lineHeight: text.size.lg,
  },
  input: {
    height: 46,
    borderColor: border.primary,
    borderBottomWidth: 1,
    fontSize: text.size.md,
    color: text.color.primary,
    outlineStyle: "none",
  },
  btnWrapper: {
    width: "100%",
    alignItems: "flex-end",
    maxWidth: 600,
    marginTop: Platform.select({ default: spacing.md })
  },
  btn: {
    width: 56,
    height: 56,
    backgroundColor: button.primary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledBtn: {
    opacity: 0.4,
  },
});
