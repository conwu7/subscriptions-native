import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {BillingPeriod} from '../../../shared/enums';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DefaultText from '../../default-text';
import style from '../style';
import {Input} from '@rneui/base';
import {Ionicons} from '@expo/vector-icons';
import {useState} from 'react';
import Dropdown from 'react-native-input-select';
import {Subscription} from '../../../shared/types/subscription';
import * as Crypto from 'expo-crypto';
import {determineTextColor} from '../../../shared/color';
import ColorPickerOverlay from '../../color-picker-overlay';
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {toStandardDateFormat} from '../../../shared/dates';
import dayjs from 'dayjs';

const schema = yup
  .object({
    name: yup.string().trim().required().min(3),
    description: yup.string().optional(),
    amount: yup
      .string()
      .required()
      .test('Valid Amount', value => !isNaN(parseFloat(value))),
    notes: yup.string().optional(),
  })
  .required();

type FormData = {
  name: string;
  description?: string;
  amount: string;
  notes?: string;
};

interface FormProps {
  addSubscription: (subscription: Subscription) => void;
  onSubmit?: () => void;
}

export default function NewSubscriptionForm(props: FormProps) {
  const [frequency, setFrequency] = useState<BillingPeriod>(BillingPeriod.MONTHLY);
  const [isDisplayingColorPicker, setColorPickerStatus] = useState(false);
  const [color, setColor] = useState('#89CFF0');
  const [nextBillingDate, setNextBillingDate] = useState(toStandardDateFormat(new Date()));
  const [isModifyingDate, setIsModifyingDate] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      amount: '',
    },
    resolver: yupResolver(schema),
  });

  const contrastColor = determineTextColor(color ?? '#ffffff');
  const textColorStyle = {color: contrastColor};
  const onSubmit = (data: FormData) => {
    props.addSubscription({
      id: Crypto.randomUUID(),
      name: data.name.trim(),
      color: color,
      description: data.description?.trim() || null,
      amount: Number(parseFloat(data.amount).toFixed(2)),
      frequency: frequency,
      notes: data.notes?.trim() || null,
      nextBillingDate: nextBillingDate,
      originalDayOfMonth: dayjs(nextBillingDate).date(),
    });
    props.onSubmit?.();
  };

  const handleSelectColor = (color: string) => {
    setColor(color);
    setColorPickerStatus(false);
  };

  const handleDateSelection = (event: DateTimePickerEvent, date?: Date) => {
    setIsModifyingDate(false);

    const {type} = event;
    if (type === 'set' && date) {
      setNextBillingDate(toStandardDateFormat(date));
    }
  };

  return (
    <KeyboardAvoidingView style={style.formContainer} behavior={'position'}>
      <ScrollView style={style.form}>
        <DefaultText weight={700} styles={[style.formTitle]}>
          <>
            <Ionicons name="create-outline" size={40} color="gray" />
            New Subscription
          </>
        </DefaultText>
        <Controller
          control={control}
          name="name"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              // label={'Name'}
              inputStyle={style.defaultTextInputStyle}
              labelStyle={style.defaultLabelStyle}
              placeholder="Name e.g. Netflix"
              errorStyle={{color: 'red'}}
              errorMessage={errors.name?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputStyle={style.defaultTextInputStyle}
              labelStyle={style.defaultLabelStyle}
              placeholder="Description e.g. Ultra HD Plan"
              errorStyle={{color: 'red'}}
              errorMessage={errors.description?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <View style={style.colorAndDateContainer}>
          <TouchableOpacity
            style={[style.colorButton, {backgroundColor: color}]}
            onPress={() => setColorPickerStatus(prevState => !prevState)}
          >
            <DefaultText weight={600} styles={[style.colorButtonText, textColorStyle]}>
              Pick a color
            </DefaultText>
          </TouchableOpacity>

          <ColorPickerOverlay
            color={color}
            handleSelectColor={handleSelectColor}
            isVisible={isDisplayingColorPicker}
            onClose={() => setColorPickerStatus(prevState => !prevState)}
          />

          <TouchableOpacity style={[style.dateButton]} onPress={() => setIsModifyingDate(true)}>
            <DefaultText weight={400} styles={[style.dateButtonLabelText]}>
              Next Billing Date
            </DefaultText>
            <DefaultText weight={700} styles={[style.dateButtonText]}>
              {nextBillingDate}
            </DefaultText>
          </TouchableOpacity>

          {isModifyingDate && (
            <RNDateTimePicker
              value={new Date(nextBillingDate)}
              mode={'date'}
              onChange={handleDateSelection}
            />
          )}
        </View>

        <Controller
          control={control}
          name="amount"
          rules={{
            validate: value => !isNaN(parseFloat(value)),
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputStyle={style.defaultTextInputStyle}
              labelStyle={style.defaultLabelStyle}
              placeholder="Amount e.g. 20.00"
              errorStyle={{color: 'red'}}
              errorMessage={errors.amount?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType={'decimal-pad'}
            />
          )}
        />

        <Dropdown
          placeholder="Select a frequency"
          dropdownStyle={style.frequencyPicker}
          selectedItemStyle={style.frequencyPickerText}
          placeholderStyle={style.frequencyPickerText}
          options={[
            {label: 'Monthly', value: BillingPeriod.MONTHLY},
            {label: 'Annual', value: BillingPeriod.ANNUAL},
            {label: 'Bi-Annual', value: BillingPeriod.BIANNUAL},
          ]}
          selectedValue={frequency}
          onValueChange={(value: BillingPeriod) => setFrequency(value ?? BillingPeriod.MONTHLY)}
          primaryColor={'green'}
          listComponentStyles={{
            sectionHeaderStyle: {fontSize: 50},
          }}
        />

        <Controller
          control={control}
          name="notes"
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputStyle={style.defaultTextInputStyle}
              labelStyle={style.defaultLabelStyle}
              placeholder="Notes e.g. Family sharing"
              errorStyle={{color: 'red'}}
              errorMessage={errors.notes?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={style.submitButton}>
          <DefaultText weight={700} styles={[style.submitButtonText]}>
            Save
          </DefaultText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}