import React, { useCallback } from 'react';
import Payment from '../Payment';

import type {
  TossPaymentApproveTypes,
  TossPaymentFailMessageTypes,
  TossPaymentRequestDataTypes,
  TossPaymentResultMessageTypes,
} from '../types/payment.types';

import type { WebViewMessageEvent } from 'react-native-webview';

type Props = {
  clientKey: string;
  payment: TossPaymentRequestDataTypes;
  onLoading: (isLoading: boolean) => void;
  onApproveError: () => void;
  onApproveFailed: (e: TossPaymentFailMessageTypes) => void;
  onApproveSucceed: (e: TossPaymentApproveTypes) => void;
};

const PaymentContainer = ({
  clientKey,
  payment,
  onLoading,
  onApproveError,
  onApproveFailed,
  onApproveSucceed,
}: Props) => {
  const onWebViewMessageReceived = useCallback(
    async (e: WebViewMessageEvent) => {
      const tossPaymentMessageFromWeb = JSON.parse(
        e.nativeEvent.data
      ) as TossPaymentResultMessageTypes;

      console.log(tossPaymentMessageFromWeb);

      // 웹뷰로 부터 성공 및 실패 둘중 아무것도 받지못했을떄.
      if (!tossPaymentMessageFromWeb.type) {
        onApproveError();
        return;
      }

      // 결제 실패했을경우
      if (tossPaymentMessageFromWeb.type === 'fail') {
        onApproveFailed(tossPaymentMessageFromWeb.data);
        return;
      }

      // 결제 승인되었을경우
      onApproveSucceed(tossPaymentMessageFromWeb.data);
    },
    [onApproveSucceed, onApproveError, onApproveFailed]
  );

  const detectIsLoading = useCallback(
    (isLoading: boolean) => {
      console.log(isLoading);
      onLoading(isLoading);
    },
    [onLoading]
  );

  return (
    <Payment
      clientKey={clientKey}
      payment={payment}
      onWebViewMessageReceived={onWebViewMessageReceived}
      detectIsLoading={detectIsLoading}
    />
  );
};

export default PaymentContainer;
