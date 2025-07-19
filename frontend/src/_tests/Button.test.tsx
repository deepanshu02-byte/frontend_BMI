import { render, screen, fireEvent } from "@testing-library/react";
import { Button, type ButtonProps } from "../components/reusable/Button";
import '@testing-library/jest-dom';

describe("Button component", () => {
    const defaultProps: ButtonProps = {
        label: "Click Me",
        onClick: jest.fn(),
    };

    it("renders with default props", () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-blue-600");
    });

    it("calls onClick when clicked", () => {
        render(<Button {...defaultProps} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it("renders with different sizes", () => {
        const sizes: ButtonProps["size"][] = ["sm", "md", "lg"];
        sizes.forEach((size) => {
            render(<Button {...defaultProps} size={size} label={size} />);
            const button = screen.getByRole("button", { name: size });
            expect(button).toHaveClass(size === "sm" ? "px-3" : size === "md" ? "px-5" : "px-6");
        });
    });

    it("disables the button when isDisabled is true", () => {
        render(<Button {...defaultProps} isDisabled />);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it("disables the button when isLoading is true", () => {
        render(<Button {...defaultProps} isLoading />);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it("applies custom className", () => {
        render(<Button {...defaultProps} className="custom-class" />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("custom-class");
    });

    it("uses correct button type", () => {
        render(<Button {...defaultProps} type="submit" />);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
    });
});
