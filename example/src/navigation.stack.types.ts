import type { TossPaymentRequestDataTypes } from 'react-native-toss-payments';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export type NavigationStackParamsListTypes = {
  home: undefined;
  payment: {
    clientKey: string;
    data: TossPaymentRequestDataTypes;
  };
};

export type NavigationStackNavigationTypes =
  StackNavigationProp<NavigationStackParamsListTypes>;

export type PaymentParamTypes = RouteProp<
  NavigationStackParamsListTypes,
  'payment'
>;
