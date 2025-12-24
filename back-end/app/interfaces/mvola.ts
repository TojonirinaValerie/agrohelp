export interface PaymentRequest {
  amount: string;
  description: string;
  customerMSISDN: string;
  partnerMSISDN: string;
  partnerName: string;
  xCorrelationID: string;
}

export interface MvolaTransactionStatusRequest {
  xCorrelationID: string;
  userAccountIdentifier: string;
  partnerName: string;
}

export interface MvolaTransactionDetailsRequest {
  transactionId: string;
  xCorrelationID: string;
  userAccountIdentifier: string;
  partnerName: string;
}

//callback api mvola
export interface Data {
  key: string;
  value: string;
}

export interface Fee {
  feeAmount: string;
}

export interface TransactionPostResponseDto {
  serverCorrelationId: string;
  status: string;
}

export interface CallBackTransactionDto {
  serverCorrelationId: string;
  transactionStatus: string;
  requestDate?: string;
  transactionReference?: string;
  debitParty?: Data[];
  creditParty?: Data[];
  fees?: Fee[];
}

