import {BillingPeriod, FilterType} from '../enums';

export type BillingPeriodFilterType = Record<FilterType.billingPeriod, BillingPeriod[]>;

export type TagsFilterType = Record<FilterType.tags, string[]>;
