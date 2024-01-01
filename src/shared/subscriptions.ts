import {BillingPeriod, SortType, SortValues} from './enums';
import {Subscription} from './types/subscription';
import {getAnnualAmount} from './amounts';
import dayjs from 'dayjs';

export function sortSubscriptions(
  subscriptions: Subscription[],
  sortType: SortType,
  sortValue: SortValues
) {
  switch (sortType) {
    case SortType.name: {
      if (sortValue === SortValues.asc)
        return subscriptions.sort((a, b) => a.name.localeCompare(b.name));
      return subscriptions.sort((a, b) => b.name.localeCompare(a.name));
    }
    case SortType.amount: {
      if (sortValue === SortValues.asc)
        return subscriptions.sort((a, b) => getAnnualAmount(a) - getAnnualAmount(b));
      return subscriptions.sort((a, b) => getAnnualAmount(b) - getAnnualAmount(a));
    }
    case SortType.upcomingDate: {
      if (sortValue === SortValues.asc)
        return subscriptions.sort(
          (a, b) => dayjs(a.nextBillingDate).unix() - dayjs(b.nextBillingDate).unix()
        );
      return subscriptions.sort(
        (a, b) => dayjs(b.nextBillingDate).unix() - dayjs(a.nextBillingDate).unix()
      );
    }
    case SortType.createdDate:
    default: {
      if (sortValue === SortValues.asc) return subscriptions;
      return [...subscriptions].reverse();
    }
  }
}

export function filterSubscriptions(
  subscriptions: Subscription[],
  tags: Set<string>,
  periods: Set<BillingPeriod>
) {
  return subscriptions.filter(sub => {
    const shouldFilterTags = tags.size > 0;
    const shouldFilterPeriods = periods.size > 0;
    const hasASelectedTag = !!sub.tags?.some(tag => tags.has(tag));
    const hasASelectedPeriod = periods.has(sub.frequency);

    if (!shouldFilterPeriods && !shouldFilterTags) {
      return subscriptions;
    } else if (shouldFilterPeriods && !shouldFilterTags) {
      return hasASelectedPeriod;
    } else if (!shouldFilterPeriods && shouldFilterTags) {
      return hasASelectedTag;
    } else {
      return hasASelectedTag && hasASelectedPeriod;
    }
  });
}
