import {KeyboardAvoidingView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {BillingPeriod} from '../../../shared/enums';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DefaultText from '../../default-text';
import style from '../style';
import {Input} from '@rneui/base';
import {Entypo} from '@expo/vector-icons';
import {useState} from 'react';
import Dropdown from 'react-native-input-select';
import {Subscription} from '../../../shared/types/subscription';
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
  allTags?: string[];
  modifySubscription: (subscription: Subscription) => void;
  deleteSubscription: (subscription: Subscription) => void;
  onClose: () => void;
  subscription: Subscription;
}

export default function ModifySubscriptionForm(props: FormProps) {
  const [frequency, setFrequency] = useState<BillingPeriod>(props.subscription.frequency);
  const [isDisplayingColorPicker, setColorPickerStatus] = useState(false);
  const [color, setColor] = useState(props.subscription.color);
  const [nextBillingDate, setNextBillingDate] = useState(props.subscription.nextBillingDate);
  const [isModifyingDate, setIsModifyingDate] = useState(false);
  const [tags, setTags] = useState(new Set<string>(props.subscription.tags ?? []));
  const [tagInputValue, setTagInputValue] = useState('');
  const [tagErrorMessage, setTagErrorMessage] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: props.subscription.name,
      description: props.subscription.description ?? '',
      amount: props.subscription.amount.toString(),
      notes: props.subscription.notes ?? '',
    },
    resolver: yupResolver(schema),
  });

  const contrastColor = determineTextColor(color ?? '#ffffff');
  const textColorStyle = {color: contrastColor};
  const onSubmit = (data: FormData) => {
    props.modifySubscription({
      id: props.subscription.id,
      name: data.name.trim(),
      color: color,
      description: data.description?.trim() || null,
      amount: Number(parseFloat(data.amount).toFixed(2)),
      frequency: frequency,
      notes: data.notes?.trim() || null,
      nextBillingDate: nextBillingDate,
      originalDayOfMonth: dayjs(nextBillingDate).date(),
      tags: [...tags],
    });
    props.onClose();
  };

  const handleSelectColor = (color: string) => {
    setColor(color);
    setColorPickerStatus(false);
  };

  const handleDelete = () => {
    props.deleteSubscription(props.subscription);
    props.onClose();
  };

  const handleDateSelection = (event: DateTimePickerEvent, date?: Date) => {
    setIsModifyingDate(false);

    const {type} = event;
    if (type === 'set' && date) {
      setNextBillingDate(toStandardDateFormat(date));
    }
  };

  const handleAddTag = () => {
    if (tagInputValue.trim().length < 3) {
      setTagErrorMessage('Must be longer than 3 charaters');
      return;
    }
    setTagErrorMessage(undefined);
    tags.add(tagInputValue.trim().toLowerCase());
    setTagInputValue('');
  };

  const handleSelectTag = (tag: string) => {
    const newSet = new Set(tags);
    if (newSet.has(tag)) {
      newSet.delete(tag);
    } else {
      newSet.add(tag);
    }
    setTags(newSet);
  };

  const combinedTagsSet = new Set([...tags, ...(props.allTags ?? [])]);

  return (
    <KeyboardAvoidingView style={style.formContainer} behavior={'position'}>
      <ScrollView style={style.form}>
        <DefaultText weight={700} styles={[style.formTitle]}>
          Modify Subscription
        </DefaultText>

        <Controller
          control={control}
          name="name"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputStyle={style.defaultTextInputStyle}
              containerStyle={style.defaultTextInputContainerStyle}
              labelStyle={style.defaultLabelStyle}
              errorStyle={style.errorStyle}
              placeholder="Name e.g. Netflix"
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
              containerStyle={style.defaultTextInputContainerStyle}
              labelStyle={style.defaultLabelStyle}
              errorStyle={style.errorStyle}
              placeholder="Description e.g. Ultra HD Plan"
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
              Color
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
              containerStyle={style.defaultTextInputContainerStyle}
              labelStyle={style.defaultLabelStyle}
              errorStyle={style.errorStyle}
              placeholder="Amount e.g. 20.00"
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

        <View style={style.tagsContainer}>
          <Input
            inputStyle={style.defaultTextInputStyle}
            containerStyle={style.defaultTextInputContainerStyle}
            labelStyle={style.defaultLabelStyle}
            errorStyle={style.errorStyle}
            placeholder="Add tags e.g. Streaming"
            errorMessage={tagErrorMessage}
            onChangeText={value => setTagInputValue(value)}
            value={tagInputValue}
            onSubmitEditing={handleAddTag}
            rightIcon={
              <TouchableOpacity style={style.tagAddButton} onPress={handleAddTag}>
                <Entypo name="add-to-list" size={30} color="black" />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity style={style.tagAddButton}>
            <Entypo name="add-to-list" size={50} color="black" />
          </TouchableOpacity>
        </View>

        <View style={style.addedTagsContainer}>
          {[...combinedTagsSet].map(tag => (
            <TouchableOpacity
              style={tags.has(tag) ? style.tagItemSelectedButton : style.tagItemButton}
              onPress={() => handleSelectTag(tag)}
              key={tag}
            >
              <DefaultText>{tag}</DefaultText>
            </TouchableOpacity>
          ))}
        </View>

        <Controller
          control={control}
          name="notes"
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputStyle={style.defaultTextInputStyle}
              containerStyle={style.defaultTextInputContainerStyle}
              labelStyle={style.defaultLabelStyle}
              errorStyle={style.errorStyle}
              placeholder="Notes e.g. Family sharing"
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

        <TouchableOpacity onPress={handleDelete} style={style.deleteButton}>
          <DefaultText weight={700} styles={[style.deleteButtonText]}>
            Delete
          </DefaultText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
