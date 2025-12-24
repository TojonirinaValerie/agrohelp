import { Service } from "./Service";
import {
  TransactionDetails,
  TransactionRequest,
  TransactionResponse,
  TransactionStatus,
} from "./Types";
import { MVOLA_API_URL } from "./Client";

class TransactionService extends Service {
  async get(transactionId: string): Promise<TransactionDetails> {
    const { data } = await this.client.get<TransactionDetails>(
      `${MVOLA_API_URL}/${transactionId}`
    );
    return data;
  }

  async getStatus(serverCorrelationId: string): Promise<TransactionStatus> {
    const { data } = await this.client.get<TransactionStatus>(
      `${MVOLA_API_URL}/status/${serverCorrelationId}`
    );
    return data;
  }

  // DEPRECATED
  async sendPayment(params: TransactionRequest): Promise<TransactionResponse> {
    const { data } = await this.client.post<TransactionResponse>(
      `${MVOLA_API_URL}/`,
      { ...params, amount: params.amount.toString() }
    );
    return data;
  }

  async initMerchantPayment(params: TransactionRequest): Promise<TransactionResponse> {
    return this.sendPayment(params);
  }
}

export default TransactionService;
