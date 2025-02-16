import { fetchApiData } from "./api";

// Mock URLSearchParams
class MockURLSearchParams {
  private params: Record<string, string>;

  constructor(init?: Record<string, string>) {
    this.params = init || {};
  }

  toString() {
    return Object.entries(this.params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
}

// Mock global fetch and URLSearchParams
global.fetch = jest.fn();
global.URLSearchParams = MockURLSearchParams as any;

describe("fetchApiData", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    // Spy on console.error but prevent it from actually logging
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore console.error after all tests
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should fetch data successfully with default params", async () => {
    const mockData = [{ id: 1, title: "Test News" }];
    const mockResponse = {
      status: 200,
      json: () => Promise.resolve(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
    const result = await fetchApiData();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("token=crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg")
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should fetch data successfully with custom params", async () => {
    const mockData = [{ id: 1, title: "Test News" }];
    const mockResponse = {
      status: 200,
      json: () => Promise.resolve(mockData),
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
    const params = { category: "technology", limit: "10" };
    const result = await fetchApiData(params);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("category=technology&limit=10")
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should throw error when API returns non-200 status", async () => {
    const mockResponse = { status: 404 };
    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
    await expect(fetchApiData()).rejects.toThrow("API error: 404");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "API Fetch Error:",
      expect.any(Error)
    );
  });

  it("should throw error when fetch fails", async () => {
    const networkError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);
    await expect(fetchApiData()).rejects.toThrow("Network error");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "API Fetch Error:",
      networkError
    );
  });
});
