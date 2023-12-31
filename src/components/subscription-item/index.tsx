import {TouchableOpacity, View} from 'react-native';
import style from './style';
import DefaultText from '../default-text';
import {Subscription} from '../../shared/types/subscription';
import {BillingPeriod} from '../../shared/enums';
import {formatAmountForDisplay, getBillingPeriodAmounts} from '../../shared/amounts';
import {determineTextColor} from '../../shared/color';
import {useState} from 'react';
import ModifySubscriptionForm from '../modify-subscription-form';
import GenericOverlay from '../generic-overlay';

interface SubscriptionItemProps {
  subscription: Subscription;
  billingPeriod: BillingPeriod;
  modifySubscription: (sub: Subscription) => void;
  deleteSubscription: (sub: Subscription) => void;
}

export default function SubscriptionItem({
  subscription,
  billingPeriod,
  modifySubscription,
  deleteSubscription,
}: SubscriptionItemProps) {
  const contrastColor = determineTextColor(subscription.color ?? '#ffffff');
  const [isModifyingSubscription, setModifyingSubscription] = useState(false);

  const textColorStyle = {color: contrastColor};
  return (
    <TouchableOpacity
      onPress={() => setModifyingSubscription(true)}
      style={[style.subscriptionItem, {backgroundColor: subscription.color ?? '#fff'}]}
    >
      <View style={style.detailsSection}>
        <DefaultText styles={[style.subscriptionName, textColorStyle]} weight={600}>
          {subscription.name}
        </DefaultText>
        {subscription.description && (
          <DefaultText styles={[style.subscriptionDescription, textColorStyle]} weight={400}>
            {subscription.description}
          </DefaultText>
        )}
      </View>
      <View style={style.costSection}>
        <DefaultText styles={[style.costText, textColorStyle]} weight={700}>
          {`$${formatAmountForDisplay(getBillingPeriodAmounts(subscription, billingPeriod))}`}
        </DefaultText>
        {subscription.frequency !== billingPeriod && (
          <DefaultText styles={[style.actualCostPerPeriod, textColorStyle]} weight={400}>
            {`$${formatAmountForDisplay(subscription.amount)} ${subscription.frequency} `}
          </DefaultText>
        )}
      </View>
      <GenericOverlay
        isVisible={isModifyingSubscription}
        onClose={() => setModifyingSubscription(prevState => !prevState)}
      >
        {isModifyingSubscription && (
          <ModifySubscriptionForm
            subscription={subscription}
            modifySubscription={modifySubscription}
            deleteSubscription={deleteSubscription}
            onClose={() => setModifyingSubscription(false)}
          />
        )}
      </GenericOverlay>
    </TouchableOpacity>
  );
}
