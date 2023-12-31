import {Subscription} from './types/subscription';
import {BillingPeriod} from './enums';

export function getBillingPeriodAmounts(subscription: Subscription, billingPeriod: BillingPeriod) {
  switch (billingPeriod) {
    case BillingPeriod.ANNUAL:
      return toDecimalPlace(getAnnualAmount(subscription));
    case BillingPeriod.BIANNUAL:
      return toDecimalPlace(getAnnualAmount(subscription) / 2);
    case BillingPeriod.MONTHLY:
    default:
      return getMonthlyAmount(subscription);
  }
}

export function getAnnualAmount(sub: Subscription) {
  if (sub.frequency === BillingPeriod.MONTHLY) {
    return toDecimalPlace(sub.amount * 12);
  }

  if (sub.frequency === BillingPeriod.BIANNUAL) {
    return toDecimalPlace(sub.amount * 2);
  }

  if (sub.frequency === BillingPeriod.ANNUAL) {
    return toDecimalPlace(sub.amount);
  } else return 0;
}

export function getMonthlyAmount(sub: Subscription) {
  if (sub.frequency === BillingPeriod.MONTHLY) {
    return toDecimalPlace(sub.amount);
  }

  if (sub.frequency === BillingPeriod.BIANNUAL) {
    return toDecimalPlace(sub.amount / 6);
  }

  if (sub.frequency === BillingPeriod.ANNUAL) {
    return toDecimalPlace(sub.amount / 12);
  } else return 0;
}

export function toDecimalPlace(amount: number, decimalPlaces = 2): number {
  return Number(amount.toFixed(decimalPlaces));
}

export function formatAmountForDisplay(amount: number) {
  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return amount.toLocaleString('en-US', options);
}
