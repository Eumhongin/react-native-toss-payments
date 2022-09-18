import { SafeAreaView } from 'react-native';
import React from 'react';
import TossPayment from 'react-native-toss-payments';
import type { PaymentParamTypes } from 'example/src/navigation.stack.types';
import { useRoute } from '@react-navigation/native';

const Payment = () => {
  const route = useRoute<PaymentParamTypes>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <TossPayment
        clientKey={route.params.clientKey}
        payment={route.params.data}
        onApproveError={() => {}}
        onApproveFailed={() => {}}
        onApproveSucceed={() => {}}
      />
    </SafeAreaView>
  );
};

export default Payment;
