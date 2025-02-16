import { renderHook } from "@testing-library/react-hooks";
import theme from "../theme";
import { useTheme } from "./useTheme";

describe("useTheme Hook", () => {
  it("should return the theme object", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(theme);
  });

  it("should have defined colors", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.colors).toHaveProperty("black", "#000000");
    expect(result.current.colors).toHaveProperty("white", "#F9FAFB");
    expect(result.current.colors).toHaveProperty("background", "#05021B");
  });

  it("should have defined spacing values", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.spacing).toEqual({
      xxs: 8,
      xs: 10,
      sm: 16,
      md: 24,
      lg: 30,
    });
  });

  it("should have defined text properties", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.text.size).toEqual({
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 30,
      xxl: 32,
    });
    expect(result.current.text.color).toHaveProperty("primary", "#171717");
    expect(result.current.text.weight).toHaveProperty("bold", "700");
  });

  it("should have defined border properties", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.border).toHaveProperty("primary", "#D4D4D4");
  });

  it("should have defined button properties", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.button).toHaveProperty("primary", "#523AE4");
  });
});
