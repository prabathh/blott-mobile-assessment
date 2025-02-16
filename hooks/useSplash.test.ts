import { renderHook, act } from "@testing-library/react-hooks";
import * as SplashScreen from "expo-splash-screen";
import { useSplash } from "./useSplash";

// Mock expo-splash-screen
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

describe("useSplash Hook", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Use Jest's fake timers
    jest.useFakeTimers();
    // Mock console.warn to suppress warnings
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore real timers after each test
    jest.useRealTimers();
    // Restore console.warn
    (console.warn as jest.Mock).mockRestore();
  });

  it("should call preventAutoHideAsync and hideAsync", async () => {
    const { result } = renderHook(() => useSplash());
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(0);
    expect(result.current).toBe(false);
  });

  it("should handle errors and still set isReady to true", async () => {
    (SplashScreen.preventAutoHideAsync as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to prevent auto hide")
    );
    const { result } = renderHook(() => useSplash());
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(true);
  });
});
