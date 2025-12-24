import Address from "@/models/address";
import City from "@/models/city";
import Country from "@/models/country";
import Order from "@/models/order";
import OrderList from "@/models/order-list";
import CustomerHistory from "@/models/customer-history";
import { RequestHandler, Request, Response, NextFunction } from "express";
import TopSelling from "@/models/top-selling";
import Revenue from "@/models/revenue";
import Product from "@/models/product";

export const createOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            shippingDetails: {
                fullName, email, city, address, phoneNumber, phoneNumberPay, postalCode, notes
            },
            cartItems
        } = req.body;
        const checkCity = await City.findOne({ where: { name: city } });
        const checkCountry = await Country.findOne({ where: { name: 'Madagascar' } });
        
        let address_id = null;
        const city_id = checkCity?.id;
        const country_id = checkCountry?.id;
        if(checkCity && checkCountry) {
            const check_address = await Address.findOne({ where: { fullName: fullName, house_address: address , cityId: city_id, countryId: country_id, postal_code: postalCode, phone_number: phoneNumber, email } });
            
            if(!check_address) {
                const newAddress = Address.build({
                    fullName: fullName,
                    house_address: address, 
                    cityId: city_id, 
                    countryId: country_id, 
                    postal_code: postalCode, 
                    phone_number: phoneNumber, 
                    email: email, 
                });

                const addressCreated = await newAddress.save();
                address_id = addressCreated.id;
            } else {
                address_id = check_address.id;
            }
            const order = Order.build({
                addressId: address_id,
                status: 'pending',
                paymentStatus: 'pending'
            });
            const ordDetails = await order.save();
            let order_list: any[] = []; 
            const order_id = order.id;
            let total = 0;
            for(let item of cartItems) {
                let product_id = item.product.id;
                let product = await Product.findByPk(product_id); 
                if (!product) {
                    throw new Error('Product not found');
                }
                let quantity = item.quantity;
                order_list.push({ productId: product_id, orderId: order_id, quantity });
                total += quantity * (product.consumer_price); 

                const topSelling = await TopSelling.findOne({ where: { productId: product_id } });

                if(!topSelling) {
                    const newTopSelling = new TopSelling({
                        totalOrder: 1,
                        productId: product_id
                    });

                    await newTopSelling.save();
                } else {
                    topSelling.totalOrder += 1;

                    await topSelling.save();
                }
            }
            const newOrd = await OrderList.bulkCreate(order_list);
            
            const customerHistory = await CustomerHistory.findOne(
                { where: { customerId: address_id } });
                
            if(!customerHistory) {
                const newHistory = new CustomerHistory({
                    customerId: address_id,
                    totalOrder: 1,
                    totalSpent: total        
                });

                await newHistory.save();
            } else {
                customerHistory.totalOrder += 1; 
                customerHistory.totalSpent += total;

                await customerHistory.save();
            }
            const shopRevenue = 'agrohelp';
            const revenue = await Revenue.findOne(
                { where: { shopRevenue: shopRevenue } });
            
            if(!revenue) {
                const newRevenue = Revenue.build({
                    shopRevenue: shopRevenue,
                    totalPriceOrderEstimated: total,
                    totalPriceOrderConfirmed: 0
                });
                await newRevenue.save();
            } else {
                revenue.totalPriceOrderEstimated += total; 
                revenue.totalPriceOrderConfirmed += 0;

                await revenue.save();
            }
            
            res.handler.dataCreated("Order created with success", { order: ordDetails });
        } else {
            res.handler.badRequest("City or Country not found");
        }

    } catch (error) {
        next(error);
    }
}

export const updateOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user; 
        const order_id = req.params['_id'];
        const status = req.body.status;        
        if(user) {
            const orderUpdated = await Order.findByPk(order_id);
            
            if(orderUpdated) {
                orderUpdated.status = status;
                await orderUpdated.save();
                if(status === 'delivered' || status === 'cancelled') {
                    const orderList: any = await OrderList.findAll({ where: { orderId: order_id }, include: [{model: Product, as: 'product'}] });
                    
                    let total = 0;
                    for(let oL of orderList) {
                        total += oL.quantity * oL.product.consumer_price;
                        const productId = oL.product._id;
                        const qty = oL.quantity;
                        if(status === 'delivered') { 
                            const p = await Product.findByPk(productId);
                            if(p) {
                                p.quantity -= qty;
                                await p.save();
                            }
                            
                        }
                    }
                    
                    const shopRevenue = 'agrohelp';
                    if(status === 'delivered') {
                        const r = await Revenue.findOne(
                            { where: { shopRevenue: shopRevenue } });
                        if(r) {
                            r.totalPriceOrderConfirmed += total;
                            await r.save();
                        }
                    } 
                    if(status === 'cancelled') {
                        const r = await Revenue.findOne(
                            { where: { shopRevenue: shopRevenue } });
                        if(r) {
                            r.totalPriceOrderConfirmed -= total;
                            await r.save();
                        }
                    }
                    
                }
                res.handler.successRequest("Order status updated with success", { order: orderUpdated });
                return;
            }
            res.handler.notFound("cannot modify status because Order not found", null);
            return;
        } 
    } catch (error) {
        next(error);
    }
}

export const getOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];

        const order = await Order.findByPk(id, {
            include: [
                {
                model: Address, // Sequelize model
                as: 'address',   // Only if you used an alias
                },
            ],
        });
        res.handler.successRequest("Order found", { order: order?.toJSON() });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getAllOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Address, // Sequelize model
                    as: 'address',   // Only if you used an alias
                },
            ],
        });
        res.handler.successRequest("Order collection found", { orders: orders });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getTotalOrder: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.count();
        res.handler.successRequest("Order Total", { ordersTotal: orders });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getTotalCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customersTotal = await Address.count();
        res.handler.successRequest("Total Customer found", { customersTotal: customersTotal });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getAllCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await Address.findAll({
            include: [
                {
                model: Country,
                as: 'country', // use alias only if you defined it
                },
                {
                model: City,
                as: 'city',
                },
            ],
        });
        res.handler.successRequest("Customer Collection found", { customers: customers });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getAllCustomerHistory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await CustomerHistory.findAll({
            include: [
                {
                model: Address,
                as: 'customer', // Only if you used an alias
                },
            ],
        });
        res.handler.successRequest("Customer Collection found", { customers: customers });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getAllTopSellingProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productTopSellings = await TopSelling.findAll({
            include: [
                {
                model: Product,
                as: 'product', // only if you used an alias
                },
            ],
            order: [['totalOrder', 'DESC']],
        });
        res.handler.successRequest("Top Selling Collection found", { topSellings: productTopSellings });
        return; 
    } catch (error) {
        next(error);
    }
}

export const getRevenue: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const revenue = await Revenue.findOne({ where: { shopRevenue: "agrohelp" } });
        res.handler.successRequest("Revenue Total found", { revenue: revenue });
        return; 
    } catch (error) {
        next(error);
    }
}