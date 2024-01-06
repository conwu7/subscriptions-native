import {BillingPeriod} from './enums';
import dayjs from 'dayjs';
import {Subscription} from './types/subscription';

export function getNextBillingDate(sub: Subscription) {
  const billingDate = sub.nextBillingDate ?? toStandardDateFormat(new Date());
  let newBillingDate = billingDate;

  if (isPast(billingDate)) {
    const originalDayOfMonth = sub.originalDayOfMonth ?? null; // null only required until conversion
    if (sub.frequency === BillingPeriod.MONTHLY) {
      const numOfMonths = Math.ceil(dayjs().diff(billingDate, 'month', true));
      newBillingDate = toStandardDateFormat(
        dayjs(newBillingDate).date(originalDayOfMonth).add(numOfMonths, 'month').toDate()
      );
    }
    if (sub.frequency === BillingPeriod.BIANNUAL) {
      const numOfBiannualIntervals = Math.ceil(dayjs().diff(billingDate, 'year', true) / 2);
      newBillingDate = toStandardDateFormat(
        dayjs(newBillingDate)
          .date(originalDayOfMonth)
          .add(numOfBiannualIntervals * 6, 'month')
          .toDate()
      );
    }
    if (sub.frequency === BillingPeriod.ANNUAL) {
      const numOfYears = Math.ceil(dayjs().diff(billingDate, 'year', true));
      newBillingDate = toStandardDateFormat(
        dayjs(newBillingDate).date(originalDayOfMonth).add(numOfYears, 'year').toDate()
      );
    }
  }
  return newBillingDate;
}

function isPast(date: string | Date) {
  return dayjs().isAfter(dayjs(date), 'days');
}

export function toStandardDateFormat(date?: string | Date) {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getRelativeTimeDisplay(date: string) {
  const today = dayjs().startOf('days');
  const diffDays = dayjs(date).diff(today, 'days');
  const diffMonths = dayjs(date).diff(today, 'months');

  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return 'tomorrow';
  } else if (diffDays <= 60) {
    return `in ${Math.floor(diffDays)} days`;
  } else return `in ${diffMonths} months`;
}
