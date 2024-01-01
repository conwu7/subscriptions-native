import style from './style';
import {ScrollView} from 'react-native';
import SubscriptionItem from '../subscription-item';
import {Subscription} from '../../shared/types/subscription';
import {BillingPeriod} from '../../shared/enums';

interface SubscriptionListProps {
  allTags?: string[];
  subscriptions: Subscription[];
  billingPeriod: BillingPeriod;
  modifySubscription: (sub: Subscription) => void;
  deleteSubscription: (sub: Subscription) => void;
}
export default function SubscriptionList(props: SubscriptionListProps) {
  return (
    <ScrollView style={style.subscriptionList}>
      {props.subscriptions.map(sub => (
        <SubscriptionItem
          key={sub.id}
          allTags={props.allTags}
          subscription={sub}
          billingPeriod={props.billingPeriod}
          deleteSubscription={props.deleteSubscription}
          modifySubscription={props.modifySubscription}
        />
      ))}
    </ScrollView>
  );
}
