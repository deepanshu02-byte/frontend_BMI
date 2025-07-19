import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from '../components/reusable/Pagination';

describe("Pagination component", () => {
  const baseProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  it("does not render if totalPages is 1", () => {
    render(<Pagination {...baseProps} totalPages={1} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders page numbers and navigation buttons", () => {
    render(<Pagination {...baseProps} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onPageChange when Prev and Next are clicked", () => {
    render(<Pagination {...baseProps} />);
    fireEvent.click(screen.getByText("Prev"));
    fireEvent.click(screen.getByText("Next"));
    expect(baseProps.onPageChange).toHaveBeenCalledWith(1);
    expect(baseProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(<Pagination {...baseProps} />);
    fireEvent.click(screen.getByText("5"));
    expect(baseProps.onPageChange).toHaveBeenCalledWith(5);
  });

  it("disables Prev on first page and Next on last page", () => {
    const { rerender } = render(<Pagination {...baseProps} currentPage={1} />);
    expect(screen.getByText("Prev")).toBeDisabled();

    rerender(<Pagination {...baseProps} currentPage={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
