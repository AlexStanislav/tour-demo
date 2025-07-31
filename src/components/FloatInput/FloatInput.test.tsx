import { vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FloatInput from "./FloatInput";

describe("FloatInput component", () => {
    it("renders a custom input with a float label", () => {
        render(
            <FloatInput
                value={""}
                inputID={"testInput"}
                inputType={"text"}
                labelString={"Test Input"}
                inputAction={() => {}}
                autocompleteValues={[]}
            />
        );

        const label = screen.getByText("Test Input");

        expect(label).toBeInTheDocument();
    })

    it("calls the inputAction when the input is changed", () => {
        const inputAction = vi.fn(() => {});
        render(
            <FloatInput
                value={""}
                inputID={"testInput"}
                inputType={"text"}
                labelString={"Test Input"}
                inputAction={inputAction}
                autocompleteValues={[]}
            />
        );

        const input = screen.getByTestId("test-testInput");

        fireEvent.input(input, { target: { value: "Test Value" } });

        expect(inputAction).toHaveBeenCalledTimes(1);
        expect(inputAction).toHaveBeenCalledWith("Test Value");
    })

    it("renders an autocomplete list when input is typed", () => {
        render(
            <FloatInput
                value={""}
                inputID={"testInput"}
                inputType={"text"}
                labelString={"Test Input"}
                inputAction={() => {}}
                autocompleteValues={["Option 1", "Option 2", "Option 3"]}
            />
        );

        const input = screen.getByTestId("test-testInput");
        const autocompleteList = screen.getByTestId("autocomplete-container");

        fireEvent.input(input, { target: { value: "Opt" } });
        
        expect(autocompleteList).toBeInTheDocument();
    })

    it("hides the autocomplete list when input is cleared", () => {
        render(
            <FloatInput
                value={""}
                inputID={"testInput"}
                inputType={"text"}
                labelString={"Test Input"}
                inputAction={() => {}}
                autocompleteValues={["Option 1", "Option 2", "Option 3"]}
            />
        );

        const input = screen.getByTestId("test-testInput");
        const autocompleteList = screen.getByTestId("autocomplete-container");

        fireEvent.input(input, { target: { value: "Opt" } });
        fireEvent.input(input, { target: { value: "" } });
        
        waitFor(() => {
            expect(autocompleteList).not.toBeInTheDocument();
        })
    })

    it("returns the value of the clicked autocomplete item", () => {
        const inputAction = vi.fn(() => {});
        render(
            <FloatInput
                value={""}
                inputID={"testInput"}
                inputType={"text"}
                labelString={"Test Input"}
                inputAction={inputAction}
                autocompleteValues={["Option 1", "Option 2", "Option 3"]}
            />
        );

        const autocompleteItem = screen.getByText("Option 2");
        
        fireEvent.click(autocompleteItem);
        
        expect(inputAction).toHaveBeenCalledTimes(1);
        expect(inputAction).toHaveBeenCalledWith("Option 2");
    })
})