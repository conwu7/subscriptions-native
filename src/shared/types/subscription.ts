import {BillingPeriod} from '../enums';

export interface Subscription {
  amount: number;
  color: string;
  description?: string | null;
  frequency: BillingPeriod;
  id: string;
  name: string;
  notes?: string | null;
}
