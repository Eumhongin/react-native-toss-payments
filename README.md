# react-native-toss-payments

<!-- [![Github Downloads (total)](https://img.shields.io/github/downloads/kotlin-graphics/kotlin-unsigned/total.svg)]()
[![npm downloads](https://img.shields.io/npm/dw/react-native-toss-payments)](https://www.npmjs.com/package/react-native-toss-payments)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![Build Status][build-badge]][build]
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

<p align="center">
    <img src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' />
    <img src='https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
    <img 
        src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white&link=mailto:collineum@gmail.com"
        />

    
</p>


## 설치방법(Installation)

```sh
npm install react-native-toss-payments
npm install react-native-webview
```

or

```sh
yarn add react-native-toss-payments
yarn add react-native-webview
```

## 사용방법(Usage)

```tsx
import TossPayment from "react-native-toss-payments";

// ...

<TossPayment 
  clientKey={YOUR_CLIENT_KEY} // 토스로 부터 발급받은 TossClientKey입니다.
  payment={YOUR_TOSS_PAYMENT_DATA} // 토스결제시 필요한 토스 결제 정보입니다.
  onApproveError={onApproveError} // 토스 결제 승인 네트워크 오류시 handle하는 함수입니다.
  onApproveFailed={onApproveFailed}  // 토스 결제 승인시 승인 실패 handle하는 함수입니다.
  onApproveSucceed={onApproveSucceed} // 토스 결제 승인시 승인 성공 handle하는 함수입니다.
/>
```


## 참조(Reference)

자세한 참조사항은 [토스페이먼츠](https://docs.tosspayments.com/reference)에서 확인하실 수 있습니다. 
| Prop                   | Description      | Required | Default | Type                                    |
|------------------------|------------------|----------|---------|-----------------------------------------|
| **`clientKey`**        | 토스로 부터 발급받은 [ClientKey](https://docs.tosspayments.com/guides/apis/usage)입니다.  | true     | None    | **`string`**                                  |
| **`payment`**          | 토스 결제에 필요한 결제정보데이터 입니다.          | true     | None    | **`TossPaymentRequestDataTypes`**             |
| **`onLoading`**        | 토스 결제 모듈 로딩시 작동하는 함수입니다.          | false    | None    | **`() => void`**                              |
| **`onApproveError`**   | 토스 결제 승인 네트워크 오류시 handle하는 함수입니다.   | true     | None    | **`() => void`**                              |
| **`onApproveFailed`**  | 토스 결제 승인시 승인 실패 handle하는 함수입니다.  | true     | None    | **`(e:TossPaymentFailMessageTypes) => void`** |
| **`onApproveSucceed`** | 토스 결제 승인시 승인 성공 handle하는 함수입니다. | true     | None    | **`(e:TossPaymentApproveTypes) => void`**     |


## 라이센스(License)

[MIT](https://github.com/Eumhongin/react-native-toss-payments/blob/main/LICENSE)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
