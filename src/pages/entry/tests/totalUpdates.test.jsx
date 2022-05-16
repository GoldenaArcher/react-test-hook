import { render, screen } from "@testing-library/react";
import { render as renderWithContext } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe("test the total amount of orders", () => {
  test("update the scoop subtotal", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText(/scoops total: \$/i, {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update chocolate scoops to 2 and check the subtotal again
    const chocoInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocoInput);
    userEvent.type(chocoInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("4.00");
  });

  test("update the toppping subtotal", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    const toppingSubtotal = screen.getByText(/toppings total: \$/i, {
      exact: false,
    });
    expect(toppingSubtotal).toHaveTextContent("0.00");

    const mmCheck = await screen.findByRole("checkbox", {
      name: /M&Ms/i,
    });
    userEvent.clear(mmCheck);
    userEvent.click(mmCheck);
    expect(toppingSubtotal).toHaveTextContent("1.50");

    const cherryCheck = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.clear(cherryCheck);
    userEvent.click(cherryCheck);
    expect(toppingSubtotal).toHaveTextContent("3.00");

    userEvent.click(cherryCheck);
    expect(toppingSubtotal).toHaveTextContent("1.50");
  });
});

describe("grand total", () => {
  test("grand total starts at $0", () => {
    renderWithContext(<OrderEntry />);

    const grandTotal = screen.getByText(/grand total: \$/i, { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    renderWithContext(<OrderEntry />);

    const grandTotal = screen.getByText(/grand total: \$/i, { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const cherryCheck = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherryCheck);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    renderWithContext(<OrderEntry />);

    const grandTotal = screen.getByText(/grand total: \$/i, { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const cherryCheck = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherryCheck);

    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("gand total updates properly if item is removed", async () => {
    renderWithContext(<OrderEntry />);

    const grandTotal = screen.getByText(/grand total: \$/i, { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherryCheck = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherryCheck);
    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
});
