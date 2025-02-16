import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks";
import { NewsItem as NewsItemType } from "@/types/news";
import { Gap } from "@/components/common/Gap";

interface NewsItemProps {
  param: NewsItemType;
}

const NewsItem: React.FC<NewsItemProps> = ({ param }) => {
  const { datetime, headline, image, source, url } = param;
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "transparent",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
    },
    image: {
      width: 100,
      height: 100,
    },
    content: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerText: {
      fontSize: theme.text.size.xs,
      fontWeight: theme.text.weight.normal,
      color: theme.text.color.offWhite,
    },
    detail: {
      fontSize: theme.text.size.md,
      fontWeight: theme.text.weight.medium,
      lineHeight: theme.text.size.lg,
      color: theme.text.color.white,
    },
  });

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };

  const handlePress = async () => {
    if (!url?.trim()) return;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        console.warn(`Unable to handle URL: ${url}`);
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      console.error("Error opening URL:", err);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
        <Gap size="sm" />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{source}</Text>
            <Text style={styles.headerText}>{formatDate(datetime)}</Text>
          </View>
          <Gap size="xxs" vertical />
          <Text style={styles.detail} numberOfLines={2} ellipsizeMode="tail">
            {headline}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItem;
