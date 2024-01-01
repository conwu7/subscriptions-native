import {BillingPeriod} from '../enums';

export interface Subscription {
  amount: number;
  color: string;
  description?: string | null;
  frequency: BillingPeriod;
  id: string;
  name: string;
  nextBillingDate: string;
  originalDayOfMonth: number;
  notes?: string | null;
  tags?: string[];
}
