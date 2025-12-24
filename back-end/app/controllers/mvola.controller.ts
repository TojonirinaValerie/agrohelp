import { RequestHandler, Request, Response, NextFunction } from "express";
import { AuthResponse, Client, MVOLA_BASE_URL, TransactionDetails, TransactionRequest, TransactionResponse, TransactionService, TransactionStatus } from "../service/mvola/mvola";
import CallBackTransaction from "@/models/callback-transaction";

export const initiateTransaction: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerKey = process.env.CONSUMER_KEY;
        const consumerSecret = process.env.CONSUMER_SECRET;
        const mvola = new Client(MVOLA_BASE_URL);
        const credentials = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
        const { orderId, correlationId, customerNumber, amount, descriptionText } = req.body;
        const userAccountIdentifier = process.env.PARTNER_MSISDN;
        const partnerName = "Agrohelp-Consulting";
        mvola.transaction.setAccessToken(credentials.access_token);
        mvola.transaction.setOptions({
            version: "1.0",
            correlationId: correlationId,
            userLanguage: "FR",
            userAccountIdentifier: "msisdn;"+userAccountIdentifier!,//ex = "msisdn;0343500004"
            partnerName: partnerName,
            callbackUrl: "https://agrohelp-back.onrender.com/api/callback/transaction"
        });

        const transactionRef = correlationId;

        const tx: TransactionRequest = {
            amount: amount,
            currency: "Ar",
            descriptionText: descriptionText,
            requestDate: new Date().toISOString(),
            debitParty: [
            {
                key: "msisdn",
                value: customerNumber,
            },
            ],
            creditParty: [
            {
                key: "msisdn",
                value: userAccountIdentifier!,
            },
            ],
            metadata: [
            {
                key: "partnerName",
                value: partnerName,
            },
            {
                key: "fc",
                value: "USD",
            },
            {
                key: "amountFc",
                value: "1",
            },
            ],
            requestingOrganisationTransactionReference: transactionRef,
            originalTransactionReference: transactionRef,
        };
        const response: TransactionResponse = await mvola.transaction.initMerchantPayment(tx);
        if(response) {
            const transaction = CallBackTransaction.build({
                serverCorrelationId: response.serverCorrelationId,
                transactionStatus: response.status,
                orderId: orderId
            });
            
            await transaction.save();
            res.handler.successRequest("MVola Payment initiate with success", { response: response });
        }
        
    } catch (error) {
        next(error);
    }
}

export const getTransactionStatus: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerKey = process.env.CONSUMER_KEY;
        const consumerSecret = process.env.CONSUMER_SECRET;
        const mvola = new Client(MVOLA_BASE_URL);
        const credentials = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
        
        const { correlationId, userAccountIdentifier, partnerName } = req.body;

        mvola.transaction.setAccessToken(credentials.access_token);
        mvola.transaction.setOptions({
            version: "1.0",
            correlationId: correlationId,
            userLanguage: "FR",
            userAccountIdentifier: "msisdn;"+userAccountIdentifier,//ex = "msisdn;0343500004"
            partnerName: partnerName,
            // callbackUrl: "YOUR CALLBACK URL"
        });
        
        const txStatus: TransactionStatus = await mvola.transaction.getStatus(correlationId);
        res.handler.successRequest("Transaction status", { transaction_status: txStatus });
    } catch (error) {
        next(error);
    }
}

export const getTransactionDetails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consumerKey = process.env.CONSUMER_KEY;
        const consumerSecret = process.env.CONSUMER_SECRET;
        const mvola = new Client(MVOLA_BASE_URL);
        const credentials = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
        
        const { correlationId, userAccountIdentifier, partnerName, transactionId } = req.body;

        mvola.transaction.setAccessToken(credentials.access_token);
        mvola.transaction.setOptions({
            version: "1.0",
            correlationId: correlationId,
            userLanguage: "FR",
            userAccountIdentifier: "msisdn;"+userAccountIdentifier,//ex = "msisdn;0343500004"
            partnerName: partnerName,
            // callbackUrl: "YOUR CALLBACK URL"
        });
        const txDetails: TransactionDetails = await mvola.transaction.get(transactionId);
        res.handler.successRequest("Transaction status", { transaction_status: txDetails });
    } catch (error) {
        next(error);
    }
}
