import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import Status from ".";

test("renders Status component", () => {
  render(<Status status="" />);

  screen.debug();
});
