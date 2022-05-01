import { fireEvent, render, screen } from "@testing-library/react";
import Page from "./index";

const initialization = () => {
  render(<Page />);

  return {
    btn: screen.getByRole("button", { name: /click/i }),
    check: screen.getByRole("checkbox", { name: /disable checkbox/i }),
  };
};

describe("Checkbox & Btn interaction", () => {
  test("toggle btn disabled", () => {
    const { btn } = initialization();
    expect.toBeEnabled();
    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(btn).toHaveStyle("background-color: gray");

    fireEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  test("click btn enable/disable checkbox", () => {
    const { btn, check } = initialization();

    expect(check).toBeEnabled();
    fireEvent.click(btn);
    expect(check).toBeDisabled();

    fireEvent.click(btn);
    expect(check).toBeDisabled();
  });
});
