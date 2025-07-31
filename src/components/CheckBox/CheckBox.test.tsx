import { vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "./CheckBox";

describe("CheckBox component", () => {
  it("renders a custom checkbox", () => {
    render(
      <CheckBox
        type="checkbox"
        label="Checkbox"
        name="checkbox"
        checked={false}
        inputAction={() => {}}
      />
    );
    const lableText = screen.getByText("Checkbox");
    expect(lableText).toBeInTheDocument();
  });

  it("renders an icon when the name is 'amenities'", () => {
    render(
      <CheckBox
        type="checkbox"
        label="Checkbox"
        name="amenities"
        checked={false}
        inputAction={() => {}}
      />
    );

    const icon = screen.getByTestId("amenities-icon");
    expect(icon).toBeInTheDocument();
  });

  it("calls the inputAction function when the checkbox is checked", () => {
    const inputAction = vi.fn(() => {});

    render(
      <CheckBox
        type="checkbox"
        label="Checkbox"
        name="checkbox"
        checked={true}
        inputAction={inputAction}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(inputAction).toHaveBeenCalledTimes(1);
  });
});
