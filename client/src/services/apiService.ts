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
    // const { data, errors }: JSONResponse<Subscription> = await response.json();
    // if (response.ok) {
    //   console.log("back from server", data);
    //   const subscription = data;
    //   if (subscription) {
    //     return subscription;
    //   } else {
    //     return Promise.reject(new Error("Unable to update subscription"));
    //   }
    // } else {
    //   const error = new Error(errors?.message);
    //   return Promise.reject(error);
    // }
  },

  deleteSubscription: async (id: string): Promise<Subscription> => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: "DELETE",
    });
    return handleResponse<Subscription>(response,'Unable to delete subscription')
    // const { data, errors }: JSONResponse<Subscription> = await response.json();
    // if (response.ok) {
    //   const subscription = data;
    //   if (subscription) {
    //     return subscription;
    //   } else {
    //     return Promise.reject(new Error("Unable to delete subscription"));
    //   }
    // } else {
    //   const error = new Error(errors?.message);
    //   return Promise.reject(error);
    // }
  },

  fetchNotifications: async (): Promise<NOTIFICATION> => {
    const response = await fetch(`${BASE_URL}/notifications`);
    return handleResponse<NOTIFICATION>(response,'Unable to get notifications')

    // const { data, errors }: JSONResponse<NOTIFICATION[]> =
    //   await response.json();
    // // console.log(data);
    // if (response.ok) {
    //   const notification = data;
    //   if (notification) {
    //     return notification;
    //   } else {
    //     return Promise.reject(new Error("Unable to get notifications"));
    //   }
    // } else {
    //   const error = new Error(errors?.message);
    //   return Promise.reject(error);
    // }
  },
  deleteNotification: async (id: string): Promise<NOTIFICATION> => {
    const response = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
    });
    return handleResponse<NOTIFICATION>(response,'Unable to delete notification')
    // const { data, errors }: JSONResponse<NOTIFICATION> = await response.json();
    // if (response.ok) {
    //   const notification = data;
    //   if (notification) {
    //     return notification;
    //   } else {
    //     return Promise.reject(new Error("Unable to delete notification"));
    //   }
    // } else {
    //   const error = new Error(errors?.message);
    //   return Promise.reject(error);
    // }
  }

};
