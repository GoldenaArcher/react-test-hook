import { render, screen } from "@testing-library/react";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

describe("test scoop options function", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />, {
      wrapper: OrderDetailsProvider,
    });

    // find images
    // name for img is alt text
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("display image for each topping option from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });

    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((ele) => ele.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });
});
