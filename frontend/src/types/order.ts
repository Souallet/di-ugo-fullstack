import { Customer } from "./customer";

export type Order = {
  purchaseIdentifier: string;
  customer_id: number;
  productId: number;
  quantity: number;
  price: number;
  currency: string;
  date: string;
  customer?: Customer;
};
