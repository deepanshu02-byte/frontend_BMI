import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/reusable/Modal"; // Adjust the import path
import "@testing-library/jest-dom";

describe("Modal component", () => {
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close modal/i })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies the correct size class", () => {
    const { container } = render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal" size="lg">
        <p>Modal Content</p>
      </Modal>
    );
    const modalElement = container.querySelector("div.w-full");
    expect(modalElement).toHaveClass("max-w-2xl");
  });

  it("renders children inside the modal", () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Modal Title">
        <div data-testid="modal-body">Body Content</div>
      </Modal>
    );
    expect(screen.getByTestId("modal-body")).toHaveTextContent("Body Content");
  });
});
