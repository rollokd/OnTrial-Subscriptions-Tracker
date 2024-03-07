import { NOTIFICATION, Subscription } from "../utils/definitions";

const BASE_URL = "http://localhost:3000";

type JSONResponse<T> = {
  data?: T;
  errors?: { message: string };
};

// TODO: send broken response to test error handling

export default {
  fetchSubscriptions: async (): Promise<Subscription[]> => {
    const response = await fetch(`${BASE_URL}/subscriptions`);
    if (!response.ok) throw new Error("Failed to fetch subscriptions");
    return await response.json();
  },

  addSubscription: async (
    subscriptionData: Subscription
  ): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionData),
    });
    const { data, errors }: JSONResponse<Subscription> = await response.json();
    if (response.ok) {
      const subscription = data;
      if (subscription) {
        return subscription;
      } else {
        return Promise.reject(new Error("Unable to add subscription"));
      }
    } else {
      const error = new Error(errors?.message);
      return Promise.reject(error);
    }
  },

  updateSubscription: async (
    id: string,
    subscriptionData: Subscription
  ): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error("Failed to update subscription");
    return await response.json();
  },

  deleteSubscription: async (id: string): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete subscription");
    return await response.json();
  },

  fetchNotifications: async (): Promise<NOTIFICATION[]> => {
    const response = await fetch(`${BASE_URL}/notifications`);
    if (!response.ok) throw new Error("Failed to fetch notifications");
    return await response.json();
  },
};
