export type TossPaymentApproveTypes = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export type TossPaymentSuccessMessageFromWebTypes = {
  type: 'success';
  data: TossPaymentApproveTypes;
};

export type TossPaymentFailMessageFromWebTypes = {
  type: 'fail';
  data: TossPaymentFailMessageTypes;
};

export type TossPaymentResultMessageTypes =
  | TossPaymentFailMessageFromWebTypes
  | TossPaymentSuccessMessageFromWebTypes;

export type TossPaymentFailMessageTypes = {
  /**
   * @description 결제 요청에 실패했을 때 failUrl로 전달되는 에러 목록입니다.
   * @see https://docs.tosspayments.com/reference/error-codes#failurl%EB%A1%9C-%EC%A0%84%EB%8B%AC%EB%90%98%EB%8A%94-%EC%97%90%EB%9F%AC
   *
   * PAY_PROCESS_CANCELED - 사용자에 의해 결제가 취소되었습니다.
   * PAY_PROCESS_ABORTED - 결제 진행 중 승인에 실패하여 결제가 중단되었습니다.
   * REJECT_CARD_COMPANY - 결제 승인이 거절되었습니다.
   */
  code: 'PAY_PROCESS_CANCELED' | 'PAY_PROCESS_ABORTED' | 'REJECT_CARD_COMPANY';
  message: string;
  orderId: string;
};

/**
 * @description 계좌이체로 결제했을 때 이체 정보가 담기는 객체입니다.
 */
export type TossPaymentReceiptTransferTypes = {
  /**
   * @description 이체할 은행입니다. 은행 코드를 참고하세요.
   * @see https://docs.tosspayments.com/reference/codes#%EC%9D%80%ED%96%89-%EC%BD%94%EB%93%9C
   */
  bank: string;
  settlementStatus: 'INCOMPLETE' | 'COMPLETE'; // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다.
};

/**
 * @description 휴대폰으로 결제하면 제공되는 휴대폰 결제 관련 정보입니다.
 */
export type TossPaymentReceiptMobilePhoneTypes = {
  customerMobilePhone: string; // 결제에 사용한 휴대폰 번호입니다.
  settlementStatus: 'INCOMPLETE' | 'COMPLETE'; // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다.
  receiptUrl: string; // 휴대폰 결제 내역 영수증을 확인할 수 있는 주소입니다.
};

/**
 * @description 상품권으로 결제하면 제공되는 상품권 결제 관련 정보입니다.
 */
export type TossPaymentReceiptGiftCertificateTypes = {
  approveNo: string; // 결제 승인번호입니다. 최대 길이는 8자입니다.
  settlementStatus: 'INCOMPLETE' | 'COMPLETE'; // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다.
};

/**
 * @description 현금영수증 정보입니다.
 */
export type TossPaymentReceiptCashReceiptTypes = {
  type: '소득공제' | '지출증빙'; // 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나의 값입니다.
  amount: number; // 현금영수증 처리된 금액입니다.
  taxFreeAmount: number; // 면세 처리된 금액입니다.
  issueNumber: string; // 현금영수증 발급 번호입니다. 최대 길이는 9자 이하여야 합니다.
  receiptUrl: string; // 발행된 현금영수증을 확인할 수 있는 주소입니다.
};

/**
 * @description 카드사의 즉시 할인 프로모션 정보입니다. 즉시 할인 프로모션이 적용됐을 때만 생성됩니다.
 */
export type TossPaymentReceiptDiscountTypes = {
  amount: number; // 카드사의 즉시 할인 프로모션을 적용한 금액입니다.
};

/**
 * @description 결제 취소 이력이 담기는 배열입니다.
 */
export type TossPaymentReceiptCancelTypes = {
  cancelAmount: number; // 결제를 취소한 금액입니다.
  cancelReason: string; // 결제를 취소한 이유입니다. 최대 길이는 200자입니다.
  taxFreeAmount: number; // 취소된 금액 중 면세 금액입니다.
  taxAmount: number | null; // 과세 처리된 금액입니다.
  refundableAmount: number; // 결제 취소 후 환불 가능한 잔액입니다.
  canceledAt: string; // 결제 취소가 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss±hh:mm입니다. (e.g. 2022-01-01T00:00:00+09:00)
  transactionKey: string; // 취소 건에 대한 고유한 키 값입니다. 여러 건의 취소 거래를 구분하는데 사용됩니다. 최대 길이는 64자입니다.
};

/**
 * @description 간편결제로 결제한 정보를 담은 객체입니다.
 */
export type TossPaymentReceiptEasyPayTypes = {
  /**
   * @description 간편결제 서비스 ENUM 코드입니다.
   * @see https://docs.tosspayments.com/reference/enum-codes#%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C-%EC%84%9C%EB%B9%84%EC%8A%A4
   * TOSSPAY - 토스페이
   * NAVERPAY - 네이버페이
   * SAMSUNGPAY - 삼성페이
   * LPAY - 엘페이
   * KAKAOPAY - 카카오페이
   * PAYCO - 페이코
   * LGPAY - LG페이
   * SSG - SSG페이
   */
  provider:
    | 'TOSSPAY'
    | 'NAVERPAY'
    | 'SAMSUNGPAY'
    | 'LPAY'
    | 'KAKAOPAY'
    | 'PAYCO'
    | 'LGPAY'
    | 'SSG';
  amount: number; // 간편결제 서비스에 등록된 카드, 계좌 중 하나로 결제한 금액입니다.
  discountAmount: number; // 간편결제 서비스의 적립 포인트나 쿠폰 등을 사용해서 즉시 할인된 금액입니다.
};

/**
 * @description 결제 실패 정보입니다.
 */
export type TossPaymentReceiptFailureTypes = {
  code: string; // 오류 타입을 보여주는 에러 코드입니다.
  message: string; // 에러 메시지입니다. 에러 발생 이유를 알려줍니다. 최대 길이는 200자입니다.
};

/**
 * @description 가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다.
 */
export type TossPaymentReceiptVirtualAccountTypes = {
  accountType: '일반' | '고정'; //  가상계좌 타입을 나타냅니다. 일반, 고정 중 하나입니다.
  accountNumber: string; // 발급된 계좌 번호입니다. 최대 길이는 20자입니다.
  bank: string; // 가상계좌를 발급한 은행입니다.
  customerName: string; // 가상계좌를 발급한 고객 이름입니다. 최대 길이는 100자입니다.
  dueDate: string; // 입금 기한입니다.
  refundStatus: 'NONE' | 'FAILED' | 'PENDING' | 'PARTIAL_FAILED' | 'COMPLETED';
  /**
   * 환불처리 상태입니다. 아래와 같은 상태값을 가질 수 있습니다.
   * NONE - 해당 없음
   * FAILED - 환불 실패
   * PENDING - 환불 처리중
   * PARTIAL_FAILED - 부분환불 실패
   * COMPLETED - 환불 완료
   */
  expired: boolean; // 가상계좌가 만료되었는지 여부입니다.
  settlementStatus: 'INCOMPLETE' | 'INCOMPLETE'; // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETE, 정산이 완료됐다면 COMPLETE 값이 들어옵니다.
};

/**
 * @description 카드로 결제하면 제공되는 카드 관련 정보입니다.
 */
export type TossPaymentReceiptCardTypes = {
  company: string; // 카드사 코드입니다.
  number: string; // 카드번호입니다. 번호의 일부는 마스킹 되어 있습니다. 최대 길이는 20자입니다.
  installmentPlanMonths: number; // 할부 개월 수입니다. 일시불인 경우 0입니다.
  isInterestFree: boolean; // 무이자 할부의 적용 여부입니다.
  interestPayer: 'BUYER' | 'CARD_COMPANY' | 'MERCHANT';
  /**
   * 무이자 할부가 적용된 결제일 때 할부 수수료를 부담하는 주체에 대한 정보입니다. BUYER, CARD_COMPANY, MERCHANT 중 하나입니다.
   * BUYER - 상품을 구매한 고객
   * CARD_COMPANY - 카드사
   * MERCHANT - 상점
   */

  approveNo: string; // 카드사 승인 번호입니다. 최대 길이는 8자입니다.
  useCardPoint: boolean; // 카드사 포인트를 사용했는지 여부입니다.
  cardType: '신용' | '체크' | '기프트'; // 카드 종류입니다. 신용, 체크, 기프트 중 하나입니다.
  ownerType: '개인' | '법인'; // 카드의 소유자 타입입니다. 개인, 법인 중 하나입니다.
  acquireStatus:
    | 'READY'
    | 'REQUESTED'
    | 'COMPLETED'
    | 'CANCEL_REQUESTED'
    | 'CANCELED';
  /**
   * 카드 결제의 매입 상태입니다. 아래와 같은 상태값을 가질 수 있습니다.
   * READY - 매입 대기
   * REQUESTED - 매입 요청됨
   * COMPLETED - 매입 완료
   * CANCEL_REQUESTED - 매입 취소 요청됨
   * CANCELED - 매입 취소 완료
   */
  receiptUrl: string; // 카드 매출 전표를 확인할 수 있는 주소입니다.
  amount: number; // 카드로 결제한 금액입니다.
};

export type TossPaymentReceiptTypes = {
  mId: string; // 상점아이디(MID)입니다. 토스페이먼츠에서 상점을 구분하기 위해 발급한 고유 ID입니다. 최대 길이는 14자입니다.
  transactionKey: string; // 거래 건에 대한 고유한 키 값입니다. 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다. 최대 길이는 64자입니다.
  lastTransactionKey: string; // 마지막 거래 건에 대한 고유한 키 값입니다. 결제 한 건에 대한 승인 거래와 취소 거래를 구분하는데 사용됩니다. 예를 들어 결제 승인 후 부분 취소를 두 번 했다면 마지막 부분 취소 거래 건에 대한 키 값이 할당됩니다. 최대 길이는 64자입니다.
  paymentKey: string; // 결제 건에 대한 고유한 키 값입니다. 최대 길이는 200자입니다.
  orderId: string; // 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 최소 길이는 6자, 최대 길이는 64자입니다.
  orderName: string; // 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다.
  status:
    | 'READY'
    | 'DONE'
    | 'IN_PROGRESS'
    | 'WAITING_FOR_DEPOSIT'
    | 'CANCELED'
    | 'PARTIAL_CANCELED'
    | 'EXPIRED'
    | 'ABORTED';
  /**
   * 결제 처리 상태입니다. 아래와 같은 상태값을 가질 수 있습니다.
   * READY - 준비됨
   * IN_PROGRESS - 진행중
   * WAITING_FOR_DEPOSIT - 가상계좌 입금 대기 중
   * DONE - 결제 완료됨
   * CANCELED - 결제가 취소됨
   * PARTIAL_CANCELED - 결제가 부분 취소됨
   * ABORTED - 카드 자동 결제 혹은 키인 결제를 할 때 결제 승인에 실패함
   * EXPIRED - 유효 시간(30분)이 지나 거래가 취소됨
   */
  requestedAt: string; // 결제 요청이 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss.SSS±hh:mm으로 돌아옵니다. (e.g. 2022-01-01T00:00:00+09:00)
  approvedAt: string; // 결제 승인이 일어난 날짜와 시간 정보입니다. ISO 8601 형식인 yyyy-MM-dd'T'HH:mm:ss.SSS±hh:mm으로 돌아옵니다. (e.g. 2022-01-01T00:00:00+09:00)
  useEscrow: boolean; // 에스크로 사용 여부입니다.
  cultureExpense: boolean; // 문화비로 지출했는지 여부입니다. (도서구입, 공연 티켓, 박물관·미술관 입장권 등)

  // 카드로 결제하면 제공되는 카드 관련 정보입니다.
  card: TossPaymentReceiptCardTypes | null; // 카드로 결제하면 제공되는 카드 관련 정보입니다.
  virtualAccount: TossPaymentReceiptVirtualAccountTypes | null; // 가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다.
  transfer: TossPaymentReceiptTransferTypes | null; // 계좌이체로 결제했을 때 이체 정보가 담기는 객체입니다.
  mobilePhone: TossPaymentReceiptMobilePhoneTypes | null; // 휴대폰으로 결제하면 제공되는 휴대폰 결제 관련 정보입니다.
  giftCertificate: TossPaymentReceiptGiftCertificateTypes | null; // 상품권으로 결제하면 제공되는 상품권 결제 관련 정보입니다.
  cashReceipt: TossPaymentReceiptCashReceiptTypes | null; // 현금영수증 정보입니다.
  discount: TossPaymentReceiptDiscountTypes | null; // 카드사의 즉시 할인 프로모션 정보입니다. 즉시 할인 프로모션이 적용됐을 때만 생성됩니다.
  cancels: TossPaymentReceiptCancelTypes[] | null; // 결제 취소 이력이 담기는 배열입니다.
  /**
   * @description 가상계좌 웹훅 요청이 정상적인 요청인지 검증하기 위한 값입니다. 이 값이 가상계좌 웹훅 이벤트 본문으로 돌아온 secret과 같으면 정상적인 요청입니다. 최대 길이는 50자 이하여야 합니다.
   * @see https://docs.tosspayments.com/guides/webhook#%EC%9D%BC%EB%B0%98-%EA%B2%B0%EC%A0%9C---%EA%B0%80%EC%83%81%EA%B3%84%EC%A2%8C
   */
  secret: string;
  type: 'NORMAL' | 'BILLING' | 'BRANDPAY'; // 결제 타입 정보입니다. NORMAL(일반 결제), BILLING(자동 결제), BRANDPAY(브랜드페이) 중 하나입니다.
  easyPay: TossPaymentReceiptEasyPayTypes | null; // 간편결제로 결제한 정보를 담은 객체입니다.
  /**
   * @description 결제한 국가 정보입니다. ISO-3166의 두 자리 국가 코드 형식입니다.
   * @see https://ko.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country: 'KR';
  failure: TossPaymentReceiptFailureTypes | null; // 결제 실패 정보입니다.
  isPartialCancelable: boolean; // 부분 취소 가능 여부입니다. 이 값이 false이면 전액 취소만 가능합니다.
  receipt: {
    // 발행된 영수증 정보입니다.
    url: string; // 영수증을 확인할 수 있는 주소입니다.
  };
  /**
   * @description 토스에서 정의되지않은 변수입니다. 추측상 결제상태를 조회하는 URL로 보입니다.
   */
  checkout: {
    url: string; // 결제상태를 조회하는 URL
  };
  currency: 'KRW'; // 결제할 때 사용한 통화 단위입니다. 원화인 KRW만 사용합니다.
  totalAmount: number; // 총 결제 금액입니다.
  balanceAmount: number; // 취소할 수 있는 금액(잔고)입니다.
  suppliedAmount: number; // 공급가액입니다.
  /**
   * @description 부가세입니다. (결제 금액 amount - 면세 금액 taxFreeAmount) / 11 후 소수점 첫째 자리에서 반올림해서 계산합니다. (e.g. 결제 금액이 10,000원이고, 면세 금액이 3,000원이라면 부가세는 (10000-3000)/11 = 636.3636..을 반올림한 값 636원입니다.)
   * @see https://docs.tosspayments.com/guides/tax
   */
  vat: number;
  /**
   * @description 전체 결제 금액 중 면세 금액입니다. 값이 0으로 돌아왔다면 전체 결제 금액이 과세 대상입니다. [일반 상점일 때는 모든 결제 금액이 과세에 해당하기 때문에 0이 돌아옵니다. 면세 상점, 복합 과세 상점일 때만 면세 금액이 돌아옵니다. 더 자세한 내용은 복합 과세 처리하기에서 살펴보세요.]
   * @see https://docs.tosspayments.com/guides/tax
   */
  taxFreeAmount: number;
  method: '카드' | '가상계좌' | '휴대폰' | '계좌이체' | '상품권' | '간편결제'; // 결제할 때 사용한 결제 수단입니다. 카드, 가상계좌, 휴대폰, 계좌이체, 상품권(문화상품권, 도서문화상품권, 게임문화상품권), 간편결제 중 하나입니다.
  version: string; // Payment 객체의 응답 버전입니다. 버전 2022-06-08부터 날짜 기반 버저닝을 사용합니다.
};

export type TossPaymentRequestDataTypes = {
  amount: number; // 결제되는 금액입니다.
  orderId: string; // 상점에서 주문 건을 구분하기 위해 발급한 고유 ID입니다. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
  orderName: string; // 결제에 대한 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다.
  successUrl: string; // 결제가 성공하고 나면 리다이렉트(Redirect)되는 URL입니다. 결제 승인 처리에 필요한 값들이 쿼리 파라미터(Query Parameter)로 함께 전달됩니다. 반드시 오리진(origin)을 포함해야 합니다. 예를 들면 https://www.example.com/success와 같은 형태입니다.
  failUrl: string; //결제가 실패하면 리다이렉트되는 URL입니다. 에러 코드 및 에러 메시지가 쿼리 파라미터로 함께 전송됩니다. 반드시 오리진(origin)을 포함해야 합니다.
  /**
   * @description 카드사 코드입니다. 값이 있으면 카드사가 고정된 상태로 결제창이 열립니다. 예를 들어, BC라는 값을 주면 BC카드로 고정된 결제창이 열립니다. 카드사 코드를 참조하세요.
   * @see https://docs.tosspayments.com/reference/codes#%EC%B9%B4%EB%93%9C%EC%82%AC-%EC%BD%94%EB%93%9C
   */
  cardCompany?: string;
  /**
   * @description 할부 개월 수를 고정해 결제창을 열 때 사용합니다. 결제 금액(amount)이 5만원 이상일 때만 사용할 수 있습니다.
   * 2부터 12사이의 값을 사용할 수 있고, 0이 들어가는 경우 할부가 아닌 일시불로 결제됩니다.
   * 값을 넣지 않으면 결제창에서 전체 할부 개월 수를 선택할 수 있습니다.
   */
  cardInstallmentPlan?: number;
  /**
   * @description 선택할 수 있는 최대 할부 개월 수를 제한하기 위해 사용합니다. 결제 금액(amount)이 5만원 이상일 때만 사용할 수 있습니다.
   * 2부터 12사이의 값을 사용할 수 있고, 0이 들어가는 경우 할부가 아닌 일시불로 결제됩니다. 만약 값을 6으로 설정한다면 결제창에서 일시불~6개월 사이로 할부 개월을 선택할 수 있습니다.
   * 할부 개월 수를 고정하는 cardInstallmentPlan와 같이 사용할 수 없습니다.
   */
  maxCardInstallmentPlan?: number;
  useCardPoint?: boolean; // 카드사 포인트를 사용했는지 여부입니다. 값을 주지 않으면 사용자가 카드사 포인트 사용 여부를 결정할 수 있습니다. 이 값을 true로 주면 카드사 포인트 사용이 체크된 상태로 결제창이 열립니다. 이 값을 false로 주면 사용자는 카드사 포인트를 사용할 수 없습니다.
  useAppCardOnly?: boolean; // 카드사 앱카드로만 결제할지 여부를 결정합니다. 이 값을 true로 주면 카드사의 앱카드 결제창만 열립니다.카드사가 국민, 농협, 롯데, 삼성, 신한, 현대인 경우에만 true 값을 사용할 수 있습니다.
  useInternationalCardOnly?: boolean; // 해외카드(Visa, MasterCard, UnionPay)로 결제할 지 여부입니다. 값이 true면 해외카드 결제가 가능한 영문 결제창이 열립니다.
  flowMode?: 'DIRECT' | 'DEFAULT'; // 값으로 DIRECT를 넣고 cardCompany 파라미터 값을 채우면 결제창의 약관 동의, 카드 선택 페이지를 건너뛰고 특정 카드사의 결제로 바로 연결됩니다. DEFAULT, DIRECT 중 하나의 값이 들어올 수 있습니다.
  /**
   * @description 간편결제 결제 수단 타입입니다. flowMode 값이 DIRECT여야 합니다.
   * @see https://docs.tosspayments.com/reference/enum-codes#%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C-%EC%84%9C%EB%B9%84%EC%8A%A4
   * TOSSPAY - 토스페이
   * NAVERPAY - 네이버페이
   * SAMSUNGPAY - 삼성페이
   * LPAY - 엘페이
   * KAKAOPAY - 카카오페이
   * PAYCO - 페이코
   * LGPAY - LG페이
   * SSG - SSG페이
   */
  easyPay?:
    | 'TOSSPAY'
    | 'NAVERPAY'
    | 'SAMSUNGPAY'
    | 'LPAY'
    | 'KAKAOPAY'
    | 'PAYCO'
    | 'LGPAY'
    | 'SSG';
  appScheme?: string; // 모바일 ISP 앱에서 상점 앱으로 돌아오기 위해 사용됩니다. 상점의 앱 스킴을 지정하면 됩니다. 예를 들면 testapp://같은 형태입니다.
  customerName: string; // 고객의 이름입니다. 최대 길이는 100자입니다.
  customerEmail: string; // 고객의 이메일 주소입니다. 최대 길이는 100자입니다.
  taxFreeAmount?: number; // 결제할 금액 중 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다. *면세 상점 혹은 복합 과세 상점일 때만 설정한 금액이 적용되고, 일반 과세 상점인 경우에는 적용되지 않습니다. 더 자세한 내용은 복합 과세 처리하기에서 살펴보세요.
};
