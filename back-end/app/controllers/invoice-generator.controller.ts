import Address from "@/models/address";
import City from "@/models/city";
import Order from "@/models/order";
import OrderList from "@/models/order-list";
import Product from "@/models/product";
import { generateInvoiceFromCart } from "@/utils/utils";
import { RequestHandler, NextFunction, Request, Response } from "express";

export const createInvoice: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params['_id'];
        const ord = await Order.findByPk(orderId, {
            include: [
                { model: Address, as: 'address', },
            ]
        });

        const order: any = ord;
        const fullName = order?.address.fullName;
        const email = order?.address.email;
        const address = order?.address.house_address;
        const phoneNumber = order?.address.phone_number;
        const postalCode = order?.address.postal_code;
        const notes = order?.address?.notes;
        const city = await City.findByPk(order?.address.cityId);
        const cityName = city?.name;
        //console.log({fullName, email, cityName, address, phoneNumber, postalCode, notes});
        const orderList = await OrderList.findAll({
            where: { orderId: orderId },
            include: [
                { model: Product, as: 'product' }
            ],
            raw: true,
            nest: true
        });

        const orders: any[] = orderList; 
        
        //console.log(orders);
        
        const pdfBuffer = await generateInvoiceFromCart(orderId, {fullName, email, city: cityName ? cityName : '', address, phoneNumber, postalCode, notes}, orders);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="invoice-${orderId}.pdf"`,
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
}