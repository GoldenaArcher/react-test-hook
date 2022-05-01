import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("test scoop options function", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // find images
    // name for img is alt text
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
