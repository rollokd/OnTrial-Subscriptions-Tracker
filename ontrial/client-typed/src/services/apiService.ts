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
    console.log(response);
    const { data, errors }: JSONResponse<Subscription[]> =
      await response.json();
    console.log("output errors:", errors);
    if (response.ok) {
      const subscription = data;
      if (subscription) {
        return subscription;
      } else {
        return Promise.reject(new Error("Unable to fetch subscriptions"));
      }
    } else {
      console.log("errors", errors);
      const error = new Error(errors?.message);
      return Promise.reject(error);
    }
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
    const { data, errors }: JSONResponse<Subscription> = await response.json();
    if (response.ok) {
      console.log("back from server", data);
      const subscription = data;
      if (subscription) {
        return subscription;
      } else {
        return Promise.reject(new Error("Unable to update subscription"));
      }
    } else {
      const error = new Error(errors?.message);
      return Promise.reject(error);
    }
  },

  deleteSubscription: async (id: string): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "DELETE",
    });
    const { data, errors }: JSONResponse<Subscription> = await response.json();
    if (response.ok) {
      const subscription = data;
      if (subscription) {
        return subscription;
      } else {
        return Promise.reject(new Error("Unable to delete subscription"));
      }
    } else {
      const error = new Error(errors?.message);
      return Promise.reject(error);
    }
  },

  fetchNotifications: async () => {
    const response = await fetch(`${BASE_URL}/notifications`);

    const { data, errors }: JSONResponse<NOTIFICATION[]> =
      await response.json();
    // console.log(data);
    if (response.ok) {
      const notification = data;
      if (notification) {
        return notification;
      } else {
        return Promise.reject(new Error("Unable to get notifications"));
      }
    } else {
      const error = new Error(errors?.message);
      return Promise.reject(error);
    }
  },
};
