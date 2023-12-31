import style from './style';
import {View} from 'react-native';
import Header from '../header';
import SubscriptionList from '../subscription-list';
import Footer from '../footer';
import {useEffect, useState} from 'react';
import {Subscription} from '../../shared/types/subscription';
import {BillingPeriod} from '../../shared/enums';
import {getAnnualAmount, getMonthlyAmount} from '../../shared/amounts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriod.MONTHLY);

  useEffect(() => {
    const getList = async () => {
      const list = await AsyncStorage.getItem('subscriptionList');
      if (!list) return;
      setSubscriptions(JSON.parse(list));
    };

    getList();
  }, []);

  const addSubscription = (newSubscription: Subscription) => {
    const newList = [...subscriptions, newSubscription];

    setSubscriptions(newList);
    AsyncStorage.setItem('subscriptionList', JSON.stringify(newList));
  };

  const modifySubscription = (existingSubscription: Subscription) => {
    const index = subscriptions.findIndex(sub => sub.id === existingSubscription.id);
    const newList = [...subscriptions];
    newList[index] = existingSubscription;

    setSubscriptions(newList);
    AsyncStorage.setItem('subscriptionList', JSON.stringify(newList));
  };

  const deleteSubscription = (subscription: Subscription) => {
    const newList = subscriptions.filter(sub => sub.id !== subscription.id);

    setSubscriptions(newList);
    AsyncStorage.setItem('subscriptionList', JSON.stringify(newList));
  };

  const switchBillingPeriod = () => {
    setBillingPeriod(prevState =>
      prevState === BillingPeriod.MONTHLY ? BillingPeriod.ANNUAL : BillingPeriod.MONTHLY
    );
  };

  const getTotals = () => {
    let monthlyTotal = 0;
    let annualTotal = 0;

    for (const sub of subscriptions) {
      monthlyTotal += getMonthlyAmount(sub);
      annualTotal += getAnnualAmount(sub);
    }

    monthlyTotal = Number(monthlyTotal.toFixed(2));

    return {
      [BillingPeriod.MONTHLY]: monthlyTotal,
      [BillingPeriod.BIANNUAL]: annualTotal / 2,
      [BillingPeriod.ANNUAL]: annualTotal,
    };
  };

  return (
    <View style={style.dashboard}>
      <Header
        billingPeriod={billingPeriod}
        switchBillingPeriod={switchBillingPeriod}
        totals={getTotals()}
      />
      <SubscriptionList
        subscriptions={subscriptions}
        billingPeriod={billingPeriod}
        deleteSubscription={deleteSubscription}
        modifySubscription={modifySubscription}
      />
      <Footer addSubscription={addSubscription} />
    </View>
  );
}
