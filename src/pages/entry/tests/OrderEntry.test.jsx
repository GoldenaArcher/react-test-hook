import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

describe("test order entry", () => {
  test("handles error for sccops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });

  test("disable order btn if there are no scoops ordered", async () => {
    render(<OrderEntry />);

    let orderBtn = screen.getByRole("button", { name: /order sundae/i });
    expect(orderBtn).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(orderBtn).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(orderBtn).toBeDisabled();
  });
});
