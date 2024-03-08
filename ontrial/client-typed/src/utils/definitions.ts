export type Subscription = {
  _id?: string;
  name: string;
  cost: number;
  billingDate: string;
  status: boolean;
};

export type NOTIFICATION = {
  message: string;
  date: Date;
  read: boolean;
  _id?: string;
};

export type Sorting =
  | "alphabetical"
  | "billDate"
  | "mostExpensive"
  | "cheapest"
  | "";
export type Filtering = "all" | "suspended" | "active";
