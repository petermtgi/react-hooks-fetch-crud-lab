import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Quiz Master Admin Panel heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/quiz master admin panel/i);
  expect(headingElement).toBeInTheDocument();
});
