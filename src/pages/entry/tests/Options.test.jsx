import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("test scoop options function", () => {
  test("displays image for each scoop option from server", () => {
    render(<Options optionType="scoops" />);

    // find images
    // name for img is alt text
    const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((element) => element.altText);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
