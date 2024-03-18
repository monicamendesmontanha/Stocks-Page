import React from "react";
import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  it("renders options as a dropdown",  () => {
    const options = [
      {
        value: "a",
        label: "A",
      },
      {
        value: "b",
        label: "B",
      },
    ]
    render(<Dropdown options={options} valueSelected="" onValueChange={() => null} />);

    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  })
})