const API_KEY = "crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg";
const BASE_URL = "https://finnhub.io/api/v1/news";

export const fetchApiData = async (params: Record<string, string> = {}) => {
  try {
    const queryParams = new URLSearchParams({
      ...params,
      token: API_KEY,
    }).toString();
    const url = `${BASE_URL}?${queryParams}`;

    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
