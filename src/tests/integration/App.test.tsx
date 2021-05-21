import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../../App";
import { data } from "../../lib/topCryptoCurrencies__mock__";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { URL } from "../../lib/fetcher";
import { SUPPORTED_CURRENCIES } from "../../lib/exchangeRates";

const server = setupServer(
  rest.get(URL + "/latest", (req, res, ctx) => {
    return res(
      ctx.json({
        data,
      })
    );
  }),
  rest.get(
    "https://assets4.lottiefiles.com/private_files/lf30_jspeqlsz.json",
    (req, res, ctx) => {
      return res(ctx.body("fetched loading spinner"));
    }
  )
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

function renderApp() {
  const renderedApp = render(<App />);

  const loadingAnimation = screen.queryByLabelText("loading");

  return {
    ...renderedApp,
    loadingAnimation,
  };
}

test("Renders the Portfolio Manager", async () => {
  const { container, loadingAnimation } = renderApp();

  expect(loadingAnimation).toBeInTheDocument();

  await waitFor(() => expect(loadingAnimation).not.toBeInTheDocument());

  expect(container.innerHTML).toMatchSnapshot();
});

test("User can update preferred exchange rate", async () => {
  localStorage.setItem("holdings", '{"1": "1"}');

  const { loadingAnimation } = renderApp();

  await waitFor(() => expect(loadingAnimation).not.toBeInTheDocument());

  expect(
    (await screen.findByTestId("portfolio value-current-value")).textContent
  ).toBe(
    "₹" +
      (
        data[0].quote.USD.price * SUPPORTED_CURRENCIES["INR"].rate
      ).toLocaleString()
  );

  const selectExchangeRate = screen.getByRole("combobox", {
    name: /exchange-currency/iu,
  });

  fireEvent.change(selectExchangeRate, {
    target: { value: "USD" },
  });

  expect(
    (await screen.findByTestId("portfolio value-current-value")).textContent
  ).toBe("$" + data[0].quote.USD.price.toLocaleString());

  localStorage.clear();
});

test("User can update their holdings", async () => {
  const { loadingAnimation } = renderApp();
  await waitFor(() => expect(loadingAnimation).not.toBeInTheDocument());

  fireEvent.click(
    screen.getAllByRole("button", {
      name: /update holdings/i,
    })[0]
  );

  fireEvent.change(screen.getByRole("spinbutton"), {
    target: { value: 5 },
  });
  fireEvent.blur(screen.getByRole("spinbutton"));

  expect(
    (await screen.findByTestId("portfolio value-current-value")).textContent
  ).toBe(
    "₹" +
      (
        data[0].quote.USD.price *
        SUPPORTED_CURRENCIES["INR"].rate *
        5
      ).toLocaleString()
  );

  // Let's test if user can reset their holding.
  fireEvent.click(
    screen.getAllByRole("button", {
      name: /update holdings/i,
    })[0]
  );

  fireEvent.change(screen.getByRole("spinbutton"), {
    target: { value: 0 },
  });
  fireEvent.blur(screen.getByRole("spinbutton"));

  expect(
    screen.queryByTestId("portfolio value-current-value")
  ).not.toBeInTheDocument();
});
