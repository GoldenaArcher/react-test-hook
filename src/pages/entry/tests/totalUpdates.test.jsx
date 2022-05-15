import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

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
});
