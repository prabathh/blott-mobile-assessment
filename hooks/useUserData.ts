import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_DATA_KEY = "userData";

export const useUserData = () => {
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const saveUserData = async (firstName: string, lastName: string) => {
    const data = { firstName, lastName };
    await storeUserData(data);
    setUserData(data);
  };

  const storeUserData = async (data: {
    firstName: string;
    lastName: string;
  }) => {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const getUserData = async () => {
    try {
      const data = await AsyncStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  return { userData, loading, saveUserData, clearUserData };
};
