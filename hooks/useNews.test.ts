import { renderHook, act } from "@testing-library/react-hooks";
import { useNews } from "./useNews";
import { fetchApiData } from "@/services/api";

// Mock fetchApiData
jest.mock("@/services/api", () => ({
  fetchApiData: jest.fn(),
}));

describe("useNews Hook", () => {
  const mockNewsData = [
    {
      category: "crypto",
      datetime: 1596588232,
      headline: "B&G Foods CEO expects pantry demand to hold up post-pandemic",
      id: 5085113,
      image:
        "https://image.cnbcfm.com/api/v1/image/106629991-1595532157669-gettyimages-1221952946-362857076_1-5.jpeg?v=1595532242",
      related: "",
      source: "CNBC",
      summary:
        '"I think post-Covid, people will be working more at home, which means people will be eating more breakfast" and other meals at home, B&G CEO Ken Romanzi said.',
      url: "https://www.cnbc.com/2020/08/04/bg-foods-ceo-expects-pantry-demand-to-hold-up-post-pandemic.html",
    },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNews());
    expect(result.current.news).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.currentCategory).toBe("general");
  });

  it("should fetch news data successfully", async () => {
    // Mock fetchApiData to return news data
    (fetchApiData as jest.Mock).mockResolvedValueOnce(mockNewsData);
    const { result, waitForNextUpdate } = renderHook(() => useNews());
    act(() => {
      result.current.fetchNews();
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.news).toEqual(mockNewsData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    // Mock fetchApiData to throw an error
    const mockError = new Error("Failed to fetch news");
    (fetchApiData as jest.Mock).mockRejectedValueOnce(mockError);
    const { result, waitForNextUpdate } = renderHook(() => useNews());
    act(() => {
      result.current.fetchNews();
    });
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.news).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError.message);
  });

  it("should update currentCategory and fetch news", async () => {
    // Mock fetchApiData to return news data
    (fetchApiData as jest.Mock).mockResolvedValueOnce(mockNewsData);
    const { result, waitForNextUpdate } = renderHook(() => useNews());
    act(() => {
      result.current.setCurrentCategory("crypto");
    });
    expect(result.current.currentCategory).toBe("crypto");
    act(() => {
      result.current.fetchNews();
    });
    await waitForNextUpdate();
    expect(fetchApiData).toHaveBeenCalledWith({ category: "crypto" });
  });
});
