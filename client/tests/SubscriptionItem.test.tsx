import { render, screen } from "@testing-library/react";
import SubscriptionItem from "../src/components/SubscriptionItem";
import userEvent from "@testing-library/user-event";
import { calculateRenewalText } from "../src/utils/dateUtils";
const mockSub = {
  name: "somethingCrazy",
  cost: 2.59,
  billingDate: "2024-03-12T00:00:00.000Z",
  status: true,
};
const testFn = vi.fn(() => 0);

beforeEach(() => {
  render(
    <SubscriptionItem onEdit={testFn} subscription={mockSub}></SubscriptionItem>
  );
  vi.clearAllMocks();
});

describe("SubscriptionItem testing", () => {
  it("testing subscription name render", () => {
    const textValue = screen.getByText("somethingCrazy");
    expect(textValue).toBeInTheDocument();
  });
  it("testing onEdit function", async () => {
    const editBtn = screen.getByRole("button");
    await userEvent.click(editBtn);
    expect(testFn).toHaveBeenCalled();
  });
  it("testing cost formatting", () => {
    const textRendered = screen.getByText(`$${mockSub.cost} / month`);
    expect(textRendered).toBeInTheDocument();
  });
  it("testing date formatting", () => {
    const dateRendered = screen.getByText(
      `${calculateRenewalText(mockSub.billingDate).message}`
    );
    expect(dateRendered).toBeInTheDocument();
  });
});
