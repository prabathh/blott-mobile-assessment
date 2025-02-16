import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform
} from "react-native";
import { useEffect } from "react";
import { NewsItem } from "@/types/news";
import theme from "@/theme";
import { useNews, useUserData } from "@/hooks";
import NewsItemView from "@/components/NewsItem";
import SplitLayout from "@/components/SplitLayout";
import { Gap } from "@/components/common/Gap";

const Dashboard = () => {
  const { news, loading, error, fetchNews } = useNews();
  const { userData } = useUserData();
  const { firstName } = userData || {};

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const renderItem = ({ item }: { item: NewsItem }) => {
    return <NewsItemView param={item} />;
  };

  return (
    <SplitLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{`Hey ${firstName}`}</Text>
        <Gap size={20} vertical />
        {error ? (
          <Text style={styles.error}>
            Something went wrong. Please try again later.
          </Text>
        ) : (
          <FlatList
            data={news}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={loading ? <ActivityIndicator /> : null}
          />
        )}
      </View>
    </SplitLayout>
  );
};

export default Dashboard;

const { spacing, text } = theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  title: {
    fontSize: text.size.xxl,
    fontWeight: text.weight.extraBold,
    color: text.color.white,
    marginTop: Platform.OS === 'ios' ? 66 : 36,
  },
  error: {
    fontSize: theme.text.size.sm,
    fontWeight: theme.text.weight.medium,
    lineHeight: theme.text.size.lg,
    color: theme.text.color.white,
    marginTop: spacing.xxs
  },
});
