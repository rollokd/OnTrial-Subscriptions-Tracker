import { render, screen } from "@testing-library/react";
import Dashboard from "../src/components/Dashboard";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(
    <Dashboard
      filterCriteria="suspended"
      sortCriteria="mostExpensive"
    ></Dashboard>
  );
});
describe("Testing Dashboard component", () => {
  it("should render a button 'Add Subscription'", () => {
    const addBtn = screen.getByRole("button", { name: "Add Subscription" });
    expect(addBtn).toBeInTheDocument();
  });
  it("should render Average Expenses display show $0 with suspended subscriptions", () => {
    const textDisplay = screen.getByText("Average Expenses");
    const costValue = screen.getByText(/0\.00/);
    expect(textDisplay).toBeInTheDocument();
    expect(costValue).toBeInTheDocument();
  });
  it("should show the AddEditSubscriptionForm after clicking the Add Subscription button", async () => {
    const addButton = screen.getByRole("button", { name: "Add Subscription" });
    await userEvent.click(addButton);
    const addEditComponent = screen.getByTestId("add-edit-form");
    expect(addEditComponent).toBeInTheDocument();
  });
});
