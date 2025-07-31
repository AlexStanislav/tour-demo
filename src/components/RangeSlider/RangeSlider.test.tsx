import { vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RangeSlider from "./RangeSlider";

describe("RangeSlider component", () => {
  it("renders the component with a custom range track, min and max inputs, and range values", () => {
    render(<RangeSlider min={0} max={100} inputAction={() => {}} />);

    const rangeTrack = screen.getByTestId("range-track");
    const minSlider = screen.getByTestId("min-input");
    const maxSlider = screen.getByTestId("max-input");
    const rangeValues = screen.getByTestId("range-values");

    expect(rangeTrack).toBeInTheDocument();
    expect(minSlider).toBeInTheDocument();
    expect(maxSlider).toBeInTheDocument();
    expect(rangeValues).toBeInTheDocument();
  });

  it("changes the input values when the min and max inputs are changed", () => {
    render(<RangeSlider min={0} max={100} inputAction={() => {}} />);
    const minSlider = screen.getByTestId("min-input");
    const maxSlider = screen.getByTestId("max-input");
    fireEvent.change(minSlider, { target: { value: "50" } });
    fireEvent.change(maxSlider, { target: { value: "75" } });
    expect(minSlider).toHaveValue("50");
    expect(maxSlider).toHaveValue("75");
  });

  it("changes the range values when the min and max inputs are changed", () => {
    render(<RangeSlider min={0} max={100} inputAction={() => {}} />);
    const minSlider = screen.getByTestId("min-input");
    const maxSlider = screen.getByTestId("max-input");
    const minValue = screen.getByTestId("min-value");
    const maxValue = screen.getByTestId("max-value");
    fireEvent.change(minSlider, { target: { value: "50" } });
    fireEvent.change(maxSlider, { target: { value: "75" } });
    expect(minValue).toHaveTextContent("50");
    expect(maxValue).toHaveTextContent("75");
  });

  it("fires the inputAction when the min and max inputs are changed", () => {
    const inputAction = vi.fn(() => {});

    render(<RangeSlider min={0} max={100} inputAction={inputAction} />);
    const minSlider = screen.getByTestId("min-input");
    const maxSlider = screen.getByTestId("max-input");
    fireEvent.change(minSlider, { target: { value: "50" } });
    fireEvent.change(maxSlider, { target: { value: "75" } });
    expect(inputAction).toHaveBeenCalledTimes(2);
    expect(inputAction).toHaveBeenCalledWith(50, 75);
  });

  it("moves the range track when the min and max inputs are changed", () => {
    render(<RangeSlider min={100} max={10000} inputAction={() => {}} />);
    const minSlider = screen.getByTestId("min-input");
    const maxSlider = screen.getByTestId("max-input");
    fireEvent.change(minSlider, { target: { value: "500" } });
    fireEvent.change(maxSlider, { target: { value: "5050" } });

    const rangeTrack = screen.getByTestId("track-value");

    expect(rangeTrack).toHaveStyle({ left: "4%" });
    expect(rangeTrack).toHaveStyle({ width: "45%" });
  });
});
