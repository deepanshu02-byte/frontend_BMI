import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../components/reusable/Tabs";

const tabs = [
  { label: "Tab 1", content: <p>Content 1</p> },
  { label: "Tab 2", content: <p>Content 2</p> },
];

describe("Tabs component", () => {
  it("renders tab headers", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("renders default active tab content", () => {
    render(<Tabs tabs={tabs} defaultActiveTab="Tab 2" />);
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("changes tab on click", () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("calls onTabChange when tab is clicked", () => {
    const onTabChange = jest.fn();
    render(<Tabs tabs={tabs} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByText("Tab 2"));
    expect(onTabChange).toHaveBeenCalledWith("Tab 2");
  });
});
