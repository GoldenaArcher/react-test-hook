const {
  render,
  screen,
  waitForElementToBeRemoved,
} = require("@testing-library/react");
const { default: SummaryForm } = require("../SummaryForm");
import userEvent from "@testing-library/user-event";

describe("test SummaryForm component", () => {
  const initialization = () => {
    render(<SummaryForm />);

    // confirm order
    const button = screen.getByRole("button", /confirm order/i);

    // i agree to terms and condition
    const checkbox = screen.getByRole(
      "checkbox",
      /i agree to terms and conditions/i
    );

    return { button, checkbox };
  };

  test("initial condition", () => {
    const { button, checkbox } = initialization();

    expect(button).toBeDisabled();

    expect(checkbox).not.toBeChecked();
  });

  test("check agreement and enable/disable button", () => {
    const { button, checkbox } = initialization();

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    initialization();

    const termAndConditions = screen.getByText(/terms and conditions/i);

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    userEvent.hover(termAndConditions);

    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).toBeInTheDocument();

    userEvent.unhover(termAndConditions);

    await waitForElementToBeRemoved(
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
