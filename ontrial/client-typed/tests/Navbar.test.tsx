import Navbar from "../src/components/Navbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setFilter = vi.fn(() => {});
const setSorting = vi.fn(() => {});

beforeEach(async () => {
  render(<Navbar setFilterCriteria={setFilter} setSortCriteria={setSorting} />);
});

afterEach(async () => {});

describe("Navbar", () => {
  it("Render the sort button", () => {
    const sortButton = screen.getByRole("button", { name: "Sort" });
    expect(sortButton).toBeInTheDocument();
  });

  it("Render the filter button", () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    expect(filterButton).toBeInTheDocument();
  });

  it("sort button can be pressed to show drop down", async () => {
    const sortButton = screen.getByRole("button", { name: "Sort" });
    await userEvent.click(sortButton);
    const menuButtons = screen.getAllByRole("menuitem");
    expect(menuButtons.length).toBe(4);
  });

  it("filter button can be pressed to show drop down", async () => {
    const sortButton = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(sortButton);
    const menuButtons = screen.getAllByRole("menuitem");
    expect(menuButtons.length).toBe(3);
  });
});
