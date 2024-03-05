const BASE_URL = 'http://localhost:3000/subscriptions';

const apiService = {
  fetchSubscriptions: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch subscriptions');
    return await response.json();
  },

  addSubscription: async (subscriptionData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error('Failed to add subscription');
    return await response.json();
  },

  updateSubscription: async (id, subscriptionData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error('Failed to update subscription');
    return await response.json();
  },

  deleteSubscription: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete subscription');
    return await response.json(); 
  },
};

export default apiService;
