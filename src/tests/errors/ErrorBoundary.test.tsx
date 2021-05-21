import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorBoundary from "../../components/errors/ErrorBoundary";

function DummyComponent() {
  throw new Error("Failed to render page...");
}

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => jest.clearAllMocks());

test("Error Boundary catches errors thrown by child components", () => {
  // @ts-expect-error Does not return a valid element
  render(<DummyComponent />, { wrapper: ErrorBoundary });

  expect(console.error).toHaveBeenCalled();

  expect(
    screen.getByRole(/link/i, {
      name: "Contact Support",
    })
  ).toBeInTheDocument();
});
