export type Subscription = {
  _id: string;
  name: string;
  cost: number;
  billingDate: Date;
  status: string;
};

export type NOTIFICATION = {
  message: string;
  date: Date;
  read: boolean;
};
