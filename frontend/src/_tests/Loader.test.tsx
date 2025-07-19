import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Loader from "../components/reusable/Loader";

describe("Loader component", () => {
    it("renders the spinner", () => {
        render(<Loader />);
        const spinner = screen.getByTestId("spinner");
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass("animate-spin");
    });
});
