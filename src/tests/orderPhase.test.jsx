import userEvent from "@testing-library/user-event";
import App from "../App";
import { render, screen } from "../test-utils/testing-library-utils";

describe("test order phase for happy path", () => {
  test("path", async () => {
    // render
    render(<App />);

    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // find and click order button
    const cherryCheck = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherryCheck);

    const checkoutBtn = screen.queryByRole("button", {
      name: /Order Sundae/i,
    });
    userEvent.click(checkoutBtn);

    // check summary info based on the order
    const summaryHeading = screen.getByRole("heading", {
      name: "Order Summary",
    });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", {
      name: "Scoops: $2.00",
    });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", {
      name: "Toppings: $1.50",
    });
    expect(toppingsHeading).toBeInTheDocument();

    // check summary option items
    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();

    // accept terms and conditions and click btn to confirm order
    const checkbox = screen.getByRole(
      "checkbox",
      /i agree to terms and conditions/i
    );
    const confrmBtn = screen.getByRole("button", /confirm order/i);
    userEvent.click(checkbox);
    userEvent.click(confrmBtn);

    // confirm order number on confirmation page
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    // check confirmation page text
    // this one is async because there is a POST request to server in between summary
    //    and confirmation pages
    // expect that loading has disappeared
    const notLoading = screen.queryByText("loading");
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // find and click "new order" button on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i });
    userEvent.click(newOrderButton);

    // check that scoops and toppings have been reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText("Toppings total: $0.00");
    expect(toppingsTotal).toBeInTheDocument();

    // wait for items to appear so that Testing Library doesn't get angry about stuff
    // happening after test is over
    await screen.findByRole("spinbutton", { name: "Vanilla" });
    await screen.findByRole("checkbox", { name: "Cherries" });
  });
});
