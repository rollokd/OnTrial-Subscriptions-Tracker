import createFetchMock from "vitest-fetch-mock";
import apiService from "../src/services/apiService";
import { describe, expect, vi } from "vitest";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const subsMock = [
  {
    _id: "124",
    name: "bla bla",
    billingDate: "2024-03-12T00:00:00.000Z",
    cost: 10,
    status: true,
  },
  {
    _id: "123",
    name: "bla bla bla",
    billingDate: "2024-04-13T00:00:00.000Z",
    cost: 12,
    status: true,
  },
];

beforeEach(() => {
  fetchMocker.resetMocks();
});

describe("Fetching Subscriptions", () => {
  it("should return a valid array of subscriptions", async () => {
    fetchMocker.mockResponse((req) => {
      console.log(req.url);
      return JSON.stringify({ data: subsMock });
    });
    const response = await apiService.fetchSubscriptions();
    expect(fetchMocker).toHaveBeenCalled();
    expect(response).toEqual(subsMock);
  });
  it("should return an error message if the call fails", async () => {
    // fetchMocker.mockReject({new Error("fake message")});
    fetchMocker.mockResponse((req) => {
      console.log(req.url);
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "testing" } }),
      };
    });
    expect(() => apiService.fetchSubscriptions()).rejects.toThrowError();
  });
});

describe.only("Updating Subscription", () => {
  it("should correctly send an update", async () => {
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("PUT");
      expect(req.url.endsWith("123")).toBe(true);
      const body = await req.json()
      return {
        status: 200,
        body: JSON.stringify({ data: body })
      }
    })
    const data = {
      name: "bla bla bla squared",
      billingDate: "2025-04-13T00:00:00.000Z",
      cost: 12,
      status: true,
    }
    const response = await apiService.updateSubscription("123", data);
    expect(response).toEqual(data)
  })
  it("if sending an update fails should return an error", () => {
    fetchMocker.mockResponse((req) => {
      expect(req.method).toBe("PUT");
      expect(req.url.endsWith("123")).toBe(true);
      return {
        status: 500,
        body: JSON.stringify({ errors: { message: "testing" } })
      }
    })
    const data = {
      name: "bla bla bla squared",
      billingDate: "2025-04-13T00:00:00.000Z",
      cost: 12,
      status: true,
    }
    expect(() => apiService.updateSubscription("123", data)).rejects.toThrowError("testing");
  })
})

