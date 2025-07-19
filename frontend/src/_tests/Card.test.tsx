// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import { Card } from "../components/reusable/Card";


// describe("Card component", () => {
//     it("renders with title, subtitle, and description", () => {
//         render(
//             <Card
//                 title="Test Title"
//                 subtitle="Test Subtitle"
//                 description="Test Description"
//             />
//         );
//         expect(screen.getByText("Test Title")).toBeInTheDocument();
//         expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
//         expect(screen.getByText("Test Description")).toBeInTheDocument();
//     });

//     it("renders media content", () => {
//         render(
//             <Card media={<div data-testid="media">Media Content</div>} />
//         );
//         expect(screen.getByTestId("media")).toBeInTheDocument();
//     });

//     it("renders children content", () => {
//         render(
//             <Card>
//                 <p>Child Content</p>
//             </Card>
//         );
//         expect(screen.getByText("Child Content")).toBeInTheDocument();
//     });

//     it("renders actions", () => {
//         render(
//             <Card actions={<button>Action Button</button>} />
//         );
//         expect(screen.getByRole("button", { name: "Action Button" })).toBeInTheDocument();
//     });

//     it("renders footer", () => {
//         render(
//             <Card footer={<div>Footer Content</div>} />
//         );
//         expect(screen.getByText("Footer Content")).toBeInTheDocument();
//     });

//     it("applies variant styles correctly", () => {
//         const { rerender } = render(<Card variant="default" />);
//         expect(screen.getByRole("region")).toHaveClass("shadow-sm");

//         rerender(<Card variant="outlined" />);
//         expect(screen.getByRole("region")).toHaveClass("border");

//         rerender(<Card variant="elevated" />);
//         expect(screen.getByRole("region")).toHaveClass("shadow-lg");
//     });

//     it("applies custom className", () => {
//         render(<Card className="custom-class" />);
//         expect(screen.getByRole("region")).toHaveClass("custom-class");
//     });
// });

import { render, screen } from "@testing-library/react";
import { Card } from "../components/reusable/Card"; 
import '@testing-library/jest-dom';

describe("Card component", () => {
  it("renders title, subtitle, and description", () => {
    render(
      <Card
        title="Project Apollo"
        subtitle="Updated 2 days ago"
        description="Mission-critical dashboard"
      />
    );

    expect(screen.getByText("Project Apollo")).toBeInTheDocument();
    expect(screen.getByText("Updated 2 days ago")).toBeInTheDocument();
    expect(screen.getByText("Mission-critical dashboard")).toBeInTheDocument();
  });

  it("renders media, actions, and footer when provided", () => {
    render(
      <Card
        media={<div data-testid="media">Media Content</div>}
        actions={<button>Save</button>}
        footer={<div data-testid="footer">Footer Content</div>}
      />
    );

    expect(screen.getByTestId("media")).toHaveTextContent("Media Content");
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer Content");
  });

  it("applies the correct variant styles", () => {
    const { container } = render(<Card variant="elevated" />);
    expect(container.firstChild).toHaveClass("shadow-lg");
  });

  it("renders children inside the content area", () => {
    render(
      <Card>
        <p>Child content</p>
      </Card>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies additional custom className", () => {
    const { container } = render(<Card className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
