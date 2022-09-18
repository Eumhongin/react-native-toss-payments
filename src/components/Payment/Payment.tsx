import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

import { isAppUrl, isBlank, openPGApp } from '../../libs/libs';
import type { TossPaymentRequestDataTypes } from './types/payment.types';

type Props = {
  clientKey: string;
  payment: TossPaymentRequestDataTypes;
  onWebViewMessageReceived: (e: WebViewMessageEvent) => void;
  detectIsLoading: (isLoading: boolean) => void;
};

const Payment = ({
  clientKey,
  payment,
  onWebViewMessageReceived,
  detectIsLoading,
}: Props) => {
  const WEBVIEW_SOURCE_HTML = `
      <html>
        <head>
          <meta http-equiv='content-type' content='text/html; charset=utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>

          <script src="https://js.tosspayments.com/v1"></script>
        </head>
        <body>               
          <script>
            var clientKey = '${clientKey}'
            var tossPayments = TossPayments(clientKey) // 클라이언트 키로 초기화하기
          </script> 
        </body>
      </html>
      `;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <WebView
        style={{
          flex: 1,
        }}
        source={{
          html: WEBVIEW_SOURCE_HTML,
        }}
        injectedJavaScript={`
          tossPayments.requestPayment('카드',${JSON.stringify(
            payment
          )}).catch(err => {
            window.ReactNativeWebView.postMessage(JSON.stringify(err));  
          })
          
        `}
        onMessage={onWebViewMessageReceived}
        originWhitelist={['*']}
        sharedCookiesEnabled={true}
        onShouldStartLoadWithRequest={(request) => {
          const { url, mainDocumentURL } = request;
          if (isBlank(url, mainDocumentURL)) {
            detectIsLoading(true);
            return true;
          }

          detectIsLoading(false);

          if (isAppUrl(url)) {
            /* 3rd-party 앱 오픈 */
            openPGApp(url);

            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default Payment;
