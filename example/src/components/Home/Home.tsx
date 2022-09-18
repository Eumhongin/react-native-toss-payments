import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import type { TossPaymentRequestDataTypes } from 'react-native-toss-payments';
import { useNavigation } from '@react-navigation/native';
import type { NavigationStackNavigationTypes } from 'example/src/navigation.stack.types';

const tossPaymentLogo = require('../../assets/images/toss-payments-logo.png');

// TODO: 런칭하시는 앱 환경에 맞게 조정이 필요합니다
const testPaymentData: TossPaymentRequestDataTypes = {
  orderId: 'KR' + Date.now().toString(),
  amount: 100,
  customerName: '홍길동',
  customerEmail: 'honggildong@gmail.com',
  orderName: 'Apple Macbook Pro`16 M1 Ultra 32GB 1TB',
  appScheme: 'YOUR_APP_SCHEME://',
  successUrl: 'https://your.website/success',
  failUrl: 'https://your.website/fail',
};

const Home = () => {
  const navigation = useNavigation<NavigationStackNavigationTypes>();
  const [clientKey, setClientKey] = useState<string | undefined>(undefined);

  const onClientKeyTextChanged = useCallback((txt: string) => {
    if (txt.length === 0) {
      setClientKey(undefined);
      return;
    }

    setClientKey(txt);
  }, []);

  const onPaymentPressed = useCallback(() => {
    if (!clientKey) {
      return;
    }

    navigation.navigate('payment', {
      clientKey,
      data: testPaymentData,
    });
  }, [clientKey, navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingTop: 120,
        }}
      >
        <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'light-content' : 'dark-content'
          }
        />
        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image source={tossPaymentLogo} />
          </View>
          <View
            style={{
              marginTop: 52,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              클라이언트키
            </Text>
            <TextInput
              onChangeText={onClientKeyTextChanged}
              placeholder="클라이언트키를 입력해주세요"
              placeholderTextColor={'#c6c6c6'}
              style={{
                fontSize: 16,
                height: 48,
                borderWidth: 1,
                borderColor: '#0064FF',
                borderRadius: 8,
                paddingHorizontal: 12,
                marginTop: 12,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={onPaymentPressed}
          disabled={!clientKey}
          style={{
            height: 48,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: clientKey ? '#0064FF' : '#c6c6c6',
            marginTop: 36,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            결제요청하기
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
