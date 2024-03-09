import { act, render, screen } from "@testing-library/react";
import Notification from "../src/components/Notification";
import apiService from "../src/services/apiService";
import { NOTIFICATION } from "../src/utils/definitions";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  vi.resetAllMocks();
});

describe("notification component", () => {
  it("should render the bell svg", async () => {
    vi.spyOn(apiService, "fetchNotifications").mockResolvedValue([]);
    await act(() => render(<Notification />));
    const button = screen.getByRole("button");
    const svgEl = screen.getByTestId("bellIcon");
    expect(button).toContainElement(svgEl);
  });
  it("should render the empty dropdown", async () => {
    vi.spyOn(apiService, "fetchNotifications").mockResolvedValue([]);
    await act(() => render(<Notification />));
    const button = screen.getByRole("button");
    await userEvent.click(button);
    // no subscriptions
    const noText = screen.getByText("No new notifications");
    expect(noText).toBeInTheDocument();
  });
  it("render the correct notifications from the API", async () => {
    vi.spyOn(apiService, "fetchNotifications").mockResolvedValue([
      {
        message: "thisisme",
        date: new Date("2024-03-07T19:58:00.030Z"),
        read: false,
        _id: "65ea1c4835567bfea0f9d07b",
      } as NOTIFICATION,
    ]);
    await act(() => render(<Notification />));
    const button = screen.getByRole("button");
    await userEvent.click(button);
    // has our subscription
    const ourSub = screen.getByText("thisisme");
    expect(ourSub).toBeInTheDocument();
  });
  it("render the correct number of notifications", async () => {
    vi.spyOn(apiService, "fetchNotifications").mockResolvedValue([
      {
        message: "thisisme",
        date: new Date("2024-03-07T19:58:00.030Z"),
        read: false,
        _id: "65ea1c4835567bfea0f9d07b",
      } as NOTIFICATION,
      {
        message: "thisismeagain",
        date: new Date("2024-03-07T19:58:00.030Z"),
        read: false,
        _id: "65ea1c4835567bfea0f9d07c",
      } as NOTIFICATION,
    ]);
    await act(() => render(<Notification />));
    const number = screen.getByTestId("notifNumber").textContent;
    expect(number).toBe("2");
  });
});
