import PaymentType from "@/models/payment-type";
import { RequestHandler, Request, Response, NextFunction } from "express";

export const createPaymentType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, description} = req.body;

        const paymentType = PaymentType.build({
            name,
            description
        });

        await paymentType.save();
        res.handler.dataCreated("Payment type created with success", { paymentType: paymentType });
    } catch (error) {
        next(error);
    }
}

export const updatePaymentType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];
        const {name, description} = req.body;

        const pt = await PaymentType.findByPk(id);
        if(pt) {
            pt.name = name;
            pt.description = description;

            await pt.save();
        }
        
        res.handler.dataCreated("Payment type created with success", { paymentType: {name, description } });
        return;
    } catch (error) {
        next(error);
    }
}

export const getPaymentType : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];
        
        const paymentType = await PaymentType.findByPk(id);
        res.handler.successRequest("Payment type found", { paymentType: paymentType });
        return;
    } catch (error) {
        next(error);
    }
}

export const getAllPaymentType : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const paymentTypes = await PaymentType.findAll();
        res.handler.successRequest("Payment collection found", { paymentTypes: paymentTypes });
        return;
    } catch (error) {
        next(error);
    }
}