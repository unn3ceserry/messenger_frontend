import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import CheckboxLanguage from "../CheckboxLanguage";


afterEach(() => {
  cleanup()
})

describe("CheckboxLanguage", () => {

  it("renders the checkbox", () => {
    render(
      <CheckboxLanguage
        content="UA"
        contentEn="EN"
        isActive={false}
        onClick={() => ({})}
      />,
    );
    const label = screen.getByTestId("checkbox-language");
    expect(label).toBeDefined();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();

    render(
      <CheckboxLanguage
        content="UA"
        contentEn="EN"
        isActive={false}
        onClick={handleClick}
      />,
    );

    const checkbox = screen.getByTestId("checkbox-language");
    await userEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
