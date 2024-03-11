import Navbar from "../src/components/Navbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setFilter = vi.fn(() => { });
const setSorting = vi.fn(() => { });

beforeEach(async () => {
  render(<Navbar setFilterCriteria={setFilter} setSortCriteria={setSorting} />);
});

afterEach(async () => {
  vi.clearAllMocks();
});

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
  it("buttons can be pressed after sort button activates dropdown menu", async () => {
    const sortBtn = screen.getByRole("button", { name: "Sort" });
    await userEvent.click(sortBtn);

    const billDateBtn = screen.getByRole("menuitem", { name: "Bill Date" });
    await userEvent.click(billDateBtn);
    const AlphaBtn = screen.getByRole("menuitem", { name: "Alphabetic" });
    await userEvent.click(AlphaBtn);
    const ExpenseBtn = screen.getByRole("menuitem", { name: "Most Expensive" });
    await userEvent.click(ExpenseBtn);
    const CheapBtn = screen.getByRole("menuitem", { name: "Cheapest" });
    await userEvent.click(CheapBtn);
    expect(setSorting).toBeCalledTimes(4);
  });
  it("buttons can be pressed after filter button activates dropdown menu", async () => {
    const filterBtn = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterBtn);

    const activeBtn = screen.getByRole("menuitem", {
      name: "Active Subscriptions",
    });
    await userEvent.click(activeBtn);
    const allSubBtn = screen.getByRole("menuitem", {
      name: "All Subscriptions",
    });
    await userEvent.click(allSubBtn);
    const suspendBtn = screen.getByRole("menuitem", {
      name: "Suspended Subscriptions",
    });
    await userEvent.click(suspendBtn);

    expect(setFilter).toBeCalledTimes(3);
  });
});
