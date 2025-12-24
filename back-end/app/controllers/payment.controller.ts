import Order from "@/models/order";
import Payment from "@/models/payment";
import PaymentType from "@/models/payment-type";
import { RequestHandler, Request, Response, NextFunction } from "express";

export const createPayment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, order_id, amount, payment_type_id } = req.body;

        const order = await Order.findByPk(order_id);
        const payment_type = await PaymentType.findByPk(payment_type_id);
        if(order && payment_type) {
            const payment = Payment.build({
                status,
                orderId: order_id,
                amount,
                paymentTypeId: payment_type_id
            });

            await payment.save();
            res.handler.dataCreated("Payment with success", payment);
            return;
        }

    } catch (error) {
        next(error);
    }
} 

export const getPayment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];

        const payment = await Payment.findByPk(id, {
            include: [
                {
                model: PaymentType,
                as: 'payment_type', // only if you used an alias
                },
            ],
        });
        res.handler.successRequest("Payment found", { payment: payment });
        return;
    } catch (error) {
        next(error);
    }
}

export const getAllPayment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payments = await Payment.findAll({
            include: [
                {
                model: PaymentType,
                as: 'payment_type', // only if you used an alias
                },
            ],
        });
        res.handler.successRequest("Payment collection found", { payments: payments });
        return;
    } catch (error) {
        next(error);
    }
}