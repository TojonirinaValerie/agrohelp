import Order from "@/models/order";
import Product from "@/models/product";

import { RequestHandler, Request, Response, NextFunction } from "express";
import OrderList from "@/models/order-list";

export interface OrderItems {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  order: Order;
  product: Product;
}

export const createOrderList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  order_list = req.body;
        
        await OrderList.bulkCreate(order_list);

        res.handler.dataCreated("Order list created with success", { orderList: order_list });
        return;
    } catch (error) {
        next(error);
    }
} 

export const getOrderList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order_id = req.params['_id'];

        const orderItems = await OrderList.findAll({
            where: { orderId: order_id },
            include: [
                {
                model: Product,
                as: 'product', // only if you used an alias
                },
            ],
        });

        res.handler.successRequest("Order list collection", { orderList: orderItems });
        return;
    } catch (error) {
        next(error);
    }
} 

export const getAllOrderList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderList = await OrderList.findAll({
            include: [
                { model: Order, as: 'order' },
                { model: Product, as: 'product' }
            ],
            raw: true,
            nest: true
        });

        const orders: any[] = orderList; 
        const grouped: any = {};
            
        for (const item of orders) {
            const orderId = item.orderId;
            if (!grouped[orderId]) {
                grouped[orderId] = {
                    orderDetails: item.order,
                    items: [],
                };
            }

            grouped[orderId].items.push({
                product: item.product,
                quantity: item.quantity,
            });
        }

        const result = Object.values(grouped);

        res.handler.successRequest("Order list collection", { orderList: result });
        return;
    } catch (error) {
        next(error);
    }
} 