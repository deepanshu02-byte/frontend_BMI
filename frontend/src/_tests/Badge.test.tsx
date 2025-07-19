import { render } from "@testing-library/react";
import { Badge } from "../components/reusable/Badge";

describe("Badge component", () => {
  it("renders with default gray color", () => {
    const { getByText } = render(<Badge>Default</Badge>);
    const badge = getByText("Default");
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-800");
  });

  it("renders with green color", () => {
    const { getByText } = render(<Badge color="green">Success</Badge>);
    const badge = getByText("Success");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("renders with yellow color", () => {
    const { getByText } = render(<Badge color="yellow">Warning</Badge>);
    const badge = getByText("Warning");
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");
  });

  it("renders with red color", () => {
    const { getByText } = render(<Badge color="red">Error</Badge>);
    const badge = getByText("Error");
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });
});
