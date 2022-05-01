import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./index";

const initialization = () => {
  render(<Button />);

  return screen.getByRole("button", { name: "Change to blue" });
};

describe("Button function", () => {
  test("button has correct intial color", () => {
    const btn = initialization();
    expect(btn).toHaveStyle({ backgroundColor: "red" });
  });

  test("initial condition", () => {
    const colorBtn = initialization();
    expect(colorBtn).toBeEnabled();
  });

  test("button changes color when clicked", () => {
    const colorButton = initialization();
    fireEvent.click(colorButton);

    expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

    expect(colorButton.textContent).toBe("Change to red");
  });
});

describe("checkbox function", () => {
  test("initial condition", () => {
    render(<Button />);
  });
});
