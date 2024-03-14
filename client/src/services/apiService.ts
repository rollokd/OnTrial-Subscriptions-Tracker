import { NOTIFICATION, Subscription } from "../utils/definitions";

const BASE_URL = "http://localhost:3000";

type JSONResponse<T> = {
  data?: T;
  errors?: { message: string };
};

async function handleResponse<T>(response: Response, txt: string) {
  const { data, errors }: JSONResponse<T> =
    await response.json();
  if (response.ok) {
    const subscription = data;
    if (subscription) {
      return subscription;
    } else {
      return Promise.reject(new Error(txt));
    }
  } else {
    const error = new Error(errors?.message);
    return Promise.reject(error);
  }
}
// TODO: send broken response to test error handling

export default {
  fetchSubscriptions: async (): Promise<Subscription[]> => {
    const response = await fetch(`${BASE_URL}/subscriptions`);
    return handleResponse<Subscription[]>(response, "Unable to fetch subscriptions")
  },

  addSubscription: async (
    subscriptionData: Subscription
  ): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscriptionData),
    });
    return handleResponse<Subscription>(response, "Unable to verify subscription was added")
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
    return handleResponse<Subscription>(response, 'Unable to update subscription');
  },

  deleteSubscription: async (id: string): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "DELETE",
    });
    return handleResponse<Subscription>(response, 'Unable to delete subscription')
  },

  fetchNotifications: async (): Promise<NOTIFICATION> => {
    const response = await fetch(`${BASE_URL}/notifications`);
    return handleResponse<NOTIFICATION>(response, 'Unable to get notifications')
  },
  deleteNotification: async (id: string): Promise<NOTIFICATION> => {
    const response = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
    });
    return handleResponse<NOTIFICATION>(response, 'Unable to delete notification')
  }

};
