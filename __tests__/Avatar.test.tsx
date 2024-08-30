import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

const base64Image =
  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

describe("Avatar", () => {
  it("should render the avatar", () => {
    render(
      <Avatar>
        <AvatarImage src={base64Image} alt="Avatar" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("MD")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="Avatar" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
