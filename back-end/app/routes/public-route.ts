import { getAllCategory, getCategory } from "@/controllers/category.controller";
import { getAllFeaturedProduct, getAllProduct, getAllProductByProductType, getAllProductDasboard, getProduct } from "@/controllers/product.controller";
import { getAllProductType, getAllType, getProductType, getType } from "@/controllers/type.controller";
import { createOrder, updateOrder } from "@/controllers/order.controller";
import { Router } from "express";
import { createOrderList } from "@/controllers/order-list.controller";
import { validateRequiredFields } from "@/middlewares/request";
import { getAllCity, getCity } from "@/controllers/city.controller";
import { getAllCountry, getCountry } from "@/controllers/country.controller";
import { getAllPaymentType, getPaymentType } from "@/controllers/payment-type.controller";
import { createPayment } from "@/controllers/payment.controller";
import { getAllTransaction, getTransactionInfo, putTransaction } from "@/controllers/callback-transaction.controller";
import { initiateTransaction } from "@/controllers/mvola.controller";
import { createContact } from "@/controllers/contact.controller";
import { createInvoice } from "@/controllers/invoice-generator.controller";

const router = Router();

const apiCategory = "/category";
/**
 * @swagger
 * /category/{_id}:
 *   get:
 *     summary: Get a category by ID
 *     x-author: miandrs
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 * @author miandrs
 */
router.get(`${apiCategory}/:_id`, getCategory);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     x-author: miandrs
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories returned successfully
 * @author miandrs
 */
router.get(apiCategory, getAllCategory);

const apiType = "/type";
/**
 * @swagger
 * /type/{_id}:
 *   get:
 *     summary: Get a type by ID
 *     x-author: miandrs
 *     tags: [Type]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 * @author miandrs
 */
router.get(`${apiType}/:_id`, getType);

/**
 * @swagger
 * /type:
 *   get:
 *     summary: Get all types
 *     x-author: miandrs
 *     tags: [Type]
 *     responses:
 *       200:
 *         description: List of types returned successfully
 * @author miandrs
 */
router.get(apiType, getAllType);

/**
 * @swagger
 * /type/{_id}:
 *   get:
 *     summary: Get a type by ID
 *     x-author: miandrs
 *     tags: [Type]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 * @author miandrs
 */
router.get(`product-type/:_id`, getProductType);

/**
 * @swagger
 * /type:
 *   get:
 *     summary: Get all types
 *     x-author: miandrs
 *     tags: [Type]
 *     responses:
 *       200:
 *         description: List of types returned successfully
 * @author miandrs
 */
router.get("/product-type", getAllProductType);

const apiProduct = "/product";
/**
 * @swagger
 * /product/{_id}:
 *   get:
 *     summary: Get a product by ID
 *     x-author: miandrs
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 * @author miandrs
 */
router.get(`${apiProduct}/:_id`, getProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     x-author: miandrs
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products returned successfully
 * @author miandrs
 */
router.get(apiProduct, getAllProduct);

router.get(`${apiProduct}-dashboard`, getAllProductDasboard);

/**
 * @swagger
 * /product/featured/all:
 *   get:
 *     summary: Get all featured products
 *     x-author: miandrs
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of featured products returned successfully
 * @author miandrs
 */
router.get(`${apiProduct}/featured/all`, getAllFeaturedProduct);

router.get(`${apiProduct}/:_id/category`, getAllProductByProductType);

const apiOrder = "/order";
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     x-author: miandrs
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, status, house_address, city_id, country_id, postal_code, phone_number, email]
 *             properties:
 *               full_name: { type: string }
 *               status: { type: string }
 *               house_address: { type: string }
 *               city_id: { type: string }
 *               country_id: { type: string }
 *               postal_code: { type: string }
 *               phone_number: { type: string }
 *               email: { type: string }
 *     responses:
 *       201:
 *         description: Order created successfully
 * @author miandrs
 */
router.post(apiOrder, [
    validateRequiredFields([
        "shippingDetails",  
        "cartItems"
    ]),
  ], createOrder);

const apiOrderList = "/order-list";
/**
 * @swagger
 * /order-list:
 *   post:
 *     summary: Create an order list
 *     x-author: miandrs
 *     tags: [OrderList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order list created successfully
 * @author miandrs
 */
router.post(apiOrderList, createOrderList);

router.get(`/invoice-file/:_id`, createInvoice);

const apiCountry = "/country";
/**
 * @swagger
 * /country/{_id}:
 *   get:
 *     summary: Get a country by ID
 *     x-author: miandrs
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Country retrieved successfully
 * @author miandrs
 */
router.get(`${apiCountry}/:_id`, getCountry);

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     x-author: miandrs
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: List of countries returned successfully
 * @author miandrs
 */
router.get(apiCountry, getAllCountry);

const apiCity = "/city";
/**
 * @swagger
 * /city/{_id}:
 *   get:
 *     summary: Get a city by ID
 *     x-author: miandrs
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City retrieved successfully
 * @author miandrs
 */
router.get(`${apiCity}/:_id`, getCity);

/**
 * @swagger
 * /city:
 *   get:
 *     summary: Get all cities
 *     x-author: miandrs
 *     tags: [City]
 *     responses:
 *       200:
 *         description: List of cities returned successfully
 * @author miandrs
 */
router.get(apiCity, getAllCity);

const apiPaymentType = "/payment-type";
/**
 * @swagger
 * /payment-type/{_id}:
 *   get:
 *     summary: Get a payment type by ID
 *     x-author: miandrs
 *     tags: [PaymentType]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment type retrieved successfully
 * @author miandrs
 */
router.get(`${apiPaymentType}/:_id`, getPaymentType);

/**
 * @swagger
 * /payment-type:
 *   get:
 *     summary: Get all payment types
 *     x-author: miandrs
 *     tags: [PaymentType]
 *     responses:
 *       200:
 *         description: List of payment types returned successfully
 * @author miandrs
 */
router.get(apiPaymentType, getAllPaymentType);

const apiPayment = "/payment";
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     x-author: miandrs
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status, order_id, amount, payment_type_id]
 *             properties:
 *               status: { type: string }
 *               order_id: { type: string }
 *               amount: { type: number }
 *               payment_type_id: { type: string }
 *     responses:
 *       201:
 *         description: Payment created successfully
 * @author miandrs
 */
router.post(apiPayment, [
        validateRequiredFields([
            "status", "order_id", "amount", "payment_type_id"
        ]),
    ],
    createPayment);

const apiMvola = "/payment/mvola";
/**
 * @swagger
 * /payment/mvola:
 *   post:
 *     summary: Initiate MVola transaction
 *     x-author: miandrs
 *     tags: [Mvola]
 *     responses:
 *       200:
 *         description: Transaction initiated successfully
 * @author miandrs
 */
router.post(apiMvola, [
    validateRequiredFields([
        "orderId", "correlationId", "customerNumber", "amount", "descriptionText"]),
    ], initiateTransaction);

const apiCallback = "/callback";
/**
 * @swagger
 * /callback/transaction:
 *   put:
 *     summary: Update transaction info from callback
 *     x-author: miandrs
 *     tags: [Callback]
 *     responses:
 *       200:
 *         description: Callback received and processed
 * @author miandrs
 */
router.put(`${apiCallback}/transaction`, putTransaction);
/**
 * @swagger
 * /callback/transaction-infos:
 *   get:
 *     summary: Get all transaction infos
 *     x-author: miandrs
 *     tags: [Callback]
 *     responses:
 *       200:
 *         description: Transaction infos retrieved successfully
 * @author miandrs
 */
router.get(`${apiCallback}/transaction-infos`, getTransactionInfo);

/**
 * @swagger
 * /callback/transaction-infos/{attribute}:
 *   get:
 *     summary: Get transaction info by attribute
 *     x-author: miandrs
 *     tags: [Callback]
 *     parameters:
 *       - in: path
 *         name: attribute
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction info retrieved successfully by attribute
 * @author miandrs
 */
router.get(`${apiCallback}/transaction-infos/:attribute`, getAllTransaction);

router.post('/contact', validateRequiredFields(["name", "email", "phone", "subject", "message"]), createContact);

export { router as publicRoute };
