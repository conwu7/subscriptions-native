import style from './style';
import {View} from 'react-native';
import Header from '../header';
import SubscriptionList from '../subscription-list';
import Footer from '../footer';
import {useEffect, useMemo, useState} from 'react';
import {Subscription} from '../../shared/types/subscription';
import {BillingPeriod, SortType, SortValues} from '../../shared/enums';
import {getAnnualAmount, getMonthlyAmount} from '../../shared/amounts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getNextBillingDate} from '../../shared/dates';
import {sortSubscriptions} from '../../shared/subscriptions';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriod.MONTHLY);
  const [sortSettings, setSortSettings] = useState({
    sortType: SortType.createdDate,
    sortValue: SortValues.asc,
  });

  useEffect(() => {
    const getSortSettings = async () => {
      const settings = await AsyncStorage.getItem('subscriptionList-sortSettings');
      if (!settings) return;

      setSortSettings(JSON.parse(settings));
    };
    const getList = async () => {
      const list = await AsyncStorage.getItem('subscriptionList');
      if (!list) return;

      const processedList = processSubscriptions(JSON.parse(list));
      setSubscriptions(processedList);
    };

    getSortSettings();
    getList();
  }, []);

  const processSubscriptions = (subscriptions: Subscription[]) => {
    const processedList: Subscription[] = [];
    for (const sub of subscriptions) {
      const newBillingDate = getNextBillingDate(sub);
      processedList.push({...sub, nextBillingDate: newBillingDate});
    }
    AsyncStorage.setItem('subscriptionList', JSON.stringify(processedList));
    return processedList;
  };

  const addSubscription = (newSubscription: Subscription) => {
    const newList = [...subscriptions, newSubscription];

    const processedList = processSubscriptions(newList);
    setSubscriptions(processedList);
    AsyncStorage.setItem('subscriptionList', JSON.stringify(processedList));
  };

  const modifySubscription = (existingSubscription: Subscription) => {
    const index = subscriptions.findIndex(sub => sub.id === existingSubscription.id);
    const newList = [...subscriptions];
    newList[index] = existingSubscription;

    const processedList = processSubscriptions(newList);
    setSubscriptions(processedList);
    AsyncStorage.setItem('subscriptionList', JSON.stringify(processedList));
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

  const handleSortChange = (sortType: SortType, sortValue: SortValues) => {
    const newSortSettings = {
      sortType,
      sortValue,
    };
    setSortSettings(newSortSettings);
    AsyncStorage.setItem('subscriptionList-sortSettings', JSON.stringify(newSortSettings));
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

  const sortedSubscriptions = useMemo(
    () => sortSubscriptions(subscriptions, sortSettings.sortType, sortSettings.sortValue),
    [sortSettings, subscriptions]
  );

  return (
    <View style={style.dashboard}>
      <Header
        billingPeriod={billingPeriod}
        switchBillingPeriod={switchBillingPeriod}
        totals={getTotals()}
      />
      <SubscriptionList
        subscriptions={sortedSubscriptions}
        billingPeriod={billingPeriod}
        deleteSubscription={deleteSubscription}
        modifySubscription={modifySubscription}
      />
      <Footer
        addSubscription={addSubscription}
        handleSortChange={handleSortChange}
        sortSettings={sortSettings}
      />
    </View>
  );
}
