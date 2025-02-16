import { renderHook, act } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserData } from "./useUserData";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe("useUserData Hook", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock console.error to suppress error logs
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    (console.error as jest.Mock).mockRestore();
  });

  it("should initialize with loading state and no user data", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() => useUserData());
    expect(result.current.loading).toBe(true);
    expect(result.current.userData).toBeNull();
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.userData).toBeNull();
  });

  it("should fetch user data from AsyncStorage on mount", async () => {
    const mockUserData = { firstName: "John", lastName: "Doe" };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockUserData)
    );
    const { result, waitForNextUpdate } = renderHook(() => useUserData());
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.userData).toEqual(mockUserData);
  });

  it("should save user data to AsyncStorage", async () => {
    const mockUserData = { firstName: "Jane", lastName: "Smith" };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const { result } = renderHook(() => useUserData());
    await act(async () => {
      await result.current.saveUserData(
        mockUserData.firstName,
        mockUserData.lastName
      );
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "userData",
      JSON.stringify(mockUserData)
    );
    expect(result.current.userData).toEqual(mockUserData);
  });

  it("should clear user data from AsyncStorage", async () => {
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useUserData());
    await act(async () => {
      await result.current.clearUserData();
    });
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("userData");
    expect(result.current.userData).toBeNull();
  });

  it("should handle errors when fetching user data", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );
    const { result, waitForNextUpdate } = renderHook(() => useUserData());
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.userData).toBeNull();
  });

  it("should handle errors when clearing user data", async () => {
    (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to clear")
    );
    const { result } = renderHook(() => useUserData());
    await act(async () => {
      await result.current.clearUserData();
    });
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("userData");
    expect(result.current.userData).toBeNull();
  });
});
