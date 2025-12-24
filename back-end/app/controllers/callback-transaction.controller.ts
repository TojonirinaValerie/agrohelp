import { RequestHandler, Request, Response, NextFunction } from "express";
import CallBackTransaction from '../models/callback-transaction';
import { TransactionPostResponseDto, CallBackTransactionDto, Data, Fee } from '../interfaces/mvola';
import Order from "@/models/order";

/**
 * PUT /api/callback/transaction
 */
export const putTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: CallBackTransactionDto = req.body;
    console.log("Mvola callback in progress...");
    
    const creditParty = dto.creditParty?.[0]?.value;
    const debitParty = dto.debitParty?.[0]?.value;
    const fee = dto.fees?.[0]?.feeAmount;
    const requestDate = dto.requestDate;
    const transactionReference = dto.transactionReference;
    const transactionStatus = dto.transactionStatus;
    const serverCorrelationId = dto.serverCorrelationId;

    const existing = await CallBackTransaction.findOne(
      { where: { serverCorrelationId: serverCorrelationId } }
    );

    if(existing) {
      existing.creditParty = creditParty;
      existing.debitParty = debitParty;
      existing.requestDate = requestDate;
      existing.transactionReference = transactionReference;
      existing.transactionStatus = transactionStatus;
      existing.fees = fee;

      await existing.save();
      const orderId = existing.orderId;
      const order = await Order.findByPk(orderId);
      if(order) {
        order.paymentStatus = transactionStatus; 
        order.paymentId = existing.id;

        await order.save();
      }
      
    }
    res.handler.successRequest("Mvola callback with success...", { transaction: existing });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/callback/transaction-infos/:attribute?filter=xxx
 */
export const getTransactionInfo: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = req.query['filter'];
    const attribute = req.params['attribute'];

    if (filter === 'reference' || filter === 'id') {
      let transaction: any = null;  
      switch (filter) {
          case 'reference':
            transaction = await CallBackTransaction.findOne({ where: { transactionReference: attribute } });
          default:
            transaction = await CallBackTransaction.findByPk(attribute);
        }
        if (!transaction) {
          res.handler.notFound('Transaction infos not found');
        }
        res.handler.successRequest('Transaction found', { transaction: transaction });
    }

    if (filter === 'date' || filter === 'credit' || filter === 'debit') {
      let list: any[] = [];
      switch (filter) {
        case 'date':
          list = await CallBackTransaction.findAll({ where: { requestDate: attribute } });
        case 'credit':
          list = await CallBackTransaction.findAll({ where: { creditParty: Number(attribute) } });
        case 'debit':
          list = await CallBackTransaction.findAll({ where: { debitParty: Number(attribute) } });
        default:
          list = await CallBackTransaction.findAll();
      }
      if (!list || list.length === 0) {
        res.handler.notFound('Transaction infos not found');
      }
      res.handler.successRequest('Transaction infos collection found', { transactions: list });
    }
    res.handler.notFound('Transaction infos not found');  
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/callback/transaction-infos
 */
export const getAllTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await CallBackTransaction.findAll();
    res.handler.successRequest('Transaction infos collection found', { transactions: list });
  } catch (error) {
    next(error);
  }
}
