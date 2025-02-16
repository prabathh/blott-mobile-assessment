import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

export const useSplash = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    loadResources();
  }, []);

  return isReady;
};
