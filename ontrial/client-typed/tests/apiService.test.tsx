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

describe("adding subsciptions", () => {
  it("should return a valid subscription that was added", async () => {
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      const body = await req.json();
      body._id = _id;
      return JSON.stringify({ data: body });
    });
    const response = await apiService.addSubscription(input);
    expect(fetchMocker).toHaveBeenCalled();
    expect(response).toEqual(subsMock[0]);
  });

  it("Should return an error if it could not be added", () => {
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      return {
        status: 400,
        body: JSON.stringify({ errors: { message: "missing values" } }),
      };
    });
    expect(() => apiService.addSubscription(input)).rejects.toThrowError(
      "missing values"
    );
    expect(fetchMocker).toHaveBeenCalled();
  });

  it("should throw an error if no subscription is returned with a 200 code", () => {
    const { _id, ...input } = subsMock[0];
    fetchMocker.mockResponse(async (req) => {
      expect(req.method).toBe("POST");
      return JSON.stringify({ data: undefined });
    });
    expect(() => apiService.addSubscription(input)).rejects.toThrowError(
      "Unable to verify subscription was added"
    );
    expect(fetchMocker).toHaveBeenCalled();
  });
});
