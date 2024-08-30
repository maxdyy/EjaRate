import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("should render the footer", () => {
    render(<Footer />);
    expect(screen.getByText("Maksym Dmukhovskyy")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();

    expect(screen.getByText("Maksym Dmukhovskyy")).toHaveAttribute(
      "href",
      "https://maxdyy.com"
    );

    expect(screen.getByText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/maxdyy/EjaRate"
    );

    expect(screen.getByText("Maksym Dmukhovskyy")).toHaveAttribute(
      "target",
      "_blank"
    );

    expect(screen.getByText("GitHub")).toHaveAttribute("target", "_blank");

    expect(screen.getByText("Maksym Dmukhovskyy")).toHaveAttribute(
      "rel",
      "noreferrer"
    );
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
