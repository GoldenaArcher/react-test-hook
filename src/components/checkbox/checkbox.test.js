import Checkbox from ".";
import { render, screen } from "@testing-library/react";

const initialization = () => {
  render(<Checkbox />);

  return screen.getByRole("checkbox");
};

describe("test checkbox function", () => {
  test("initial condition", () => {
    const checkbox = initialization();
    expect(checkbox).not.toBeChecked();
  });
});
