import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../components/reusable/Input"; // adjust path if needed
import "@testing-library/jest-dom";

describe("Input Component", () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a text input", () => {
    render(
      <Input
        id="name"
        label="Name"
        type="text"
        value="John"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("John");
  });

  it("calls onChange when input value changes", () => {
    render(
      <Input
        id="email"
        label="Email"
        type="email"
        value=""
        onChange={mockOnChange}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@example.com", name: "email" } });
    expect(mockOnChange).toHaveBeenCalledWith("email", "test@example.com");
  });

  it("calls onBlur when input loses focus", () => {
    render(
      <Input
        id="email"
        label="Email"
        type="email"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("renders a textarea", () => {
    render(
      <Input
        id="desc"
        label="Description"
        type="textarea"
        value="Sample"
        onChange={mockOnChange}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName.toLowerCase()).toBe("textarea");
    expect(textarea).toHaveValue("Sample");
  });

  it("renders select with options", () => {
    const options = [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
    ];
    render(
      <Input
        id="select"
        label="Select Option"
        type="select"
        value="b"
        onChange={mockOnChange}
        options={options}
      />
    );

    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("renders multiselect with multiple selected options", () => {
    const options = [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
      { label: "Three", value: "3" },
    ];

    render(
      <Input
        id="multi"
        label="Multi"
        type="multiselect"
        value={["1", "3"]}
        onChange={mockOnChange}
        options={options}
      />
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Three")).toBeInTheDocument();
  });

  it("displays an error message", () => {
    render(
      <Input
        id="username"
        label="Username"
        type="text"
        value=""
        onChange={mockOnChange}
        error="Username is required"
      />
    );

    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });
});
