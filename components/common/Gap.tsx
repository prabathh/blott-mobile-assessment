import theme from "@/theme";
import { StyleSheet, View } from "react-native";

const { spacing } = theme;

type Spacing = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

type Size = keyof Spacing | number;

type Props = {
  vertical?: boolean;
  size?: Size;
};

export const Gap = ({ vertical, size = "xs" }: Props) => {
  const sz = typeof size === "string" ? spacing[size as keyof Spacing] : size;

  const styles = StyleSheet.create({
    default: {
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={[styles.default, vertical ? { height: sz } : { width: sz }]} />
  );
};
