jest.mock("@react-native/js-polyfills", () => ({
  ErrorUtils: {
    setGlobalHandler: jest.fn(),
  },
}));
