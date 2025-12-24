import { createCategory, updateCategory } from "@/controllers/category.controller";
import { createCity } from "@/controllers/city.controller";
import { getContact } from "@/controllers/contact.controller";
import { createCountry } from "@/controllers/country.controller";
import { getTransactionDetails, getTransactionStatus } from "@/controllers/mvola.controller";
import { getAllOrderList, getOrderList } from "@/controllers/order-list.controller";
import { getAllCustomer, getAllCustomerHistory, getAllOrder, getAllTopSellingProduct, getOrder, getRevenue, getTotalCustomer, getTotalOrder, updateOrder } from "@/controllers/order.controller";
import { createPaymentType, updatePaymentType } from "@/controllers/payment-type.controller";
import { getAllPayment, getPayment } from "@/controllers/payment.controller";
import { createProduct, getAllProduct, getTotalProduct, restockProduct, updateProduct } from "@/controllers/product.controller";
import { createType, updateType } from "@/controllers/type.controller";
import upload from "@/middlewares/multer/multer";
import { validateRequiredFields } from "@/middlewares/request";
import { Router } from "express";
const router = Router();

const apiCategory = "/category";
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     x-author: miandrs
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nameEn
 *               - description
 *               - descriptionEn
 *             properties:
 *               name:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               description:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 * @author miandrs
 */
router.post(
  apiCategory,
  [validateRequiredFields(["name", "nameEn", "description", "descriptionEn"])],
  createCategory
);

/**
 * @swagger
 * /category/{_id}:
 *   put:
 *     summary: Update an existing category
 *     x-author: miandrs
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nameEn
 *               - description
 *               - descriptionEn
 *             properties:
 *               name:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               description:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 * @author miandrs
 */
router.put(
  `${apiCategory}/:_id`,
  [validateRequiredFields(["name", "nameEn", "description", "descriptionEn"])],
  updateCategory
);

const apiType = "/type";
/**
 * @swagger
 * /type:
 *   post:
 *     summary: Create a new type
 *     x-author: miandrs
 *     tags:
 *       - Type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - nameEn
 *               - descriptionEn
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               description:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Type created
 * @author miandrs
 */
router.post(
  apiType,
  [validateRequiredFields(["name", "nameEn", "description", "descriptionEn", "category_id"])],
  createType
);


/**
 * @swagger
 * /type/{_id}:
 *   put:
 *     summary: Update an existing type
 *     x-author: miandrs
 *     tags:
 *       - Type
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - nameEn
 *               - descriptionEn
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Type updated
 * @author miandrs
 */
router.put(
  `${apiType}/:_id`,
  [validateRequiredFields(["name", "nameEn", "description", "descriptionEn", "category_id"])],
  updateType
);

const apiProduct = "/product";

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Return total product
 *     x-author: miandrs
 *     tags:
 *       - Product 
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Product Total
 * @author miandrs
 */
router.get(
  `${apiProduct}-total`,
  getTotalProduct
);
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     x-author: miandrs
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nameEn
 *               - description
 *               - descriptionEn
 *               - barcode
 *               - quantity
 *               - retailer_price
 *               - consumer_price
 *               - type_id
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *               barcode:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               retailer_price:
 *                 type: number
 *               consumer_price:
 *                 type: number
 *               type_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 * @author miandrs
 */
router.post(
  apiProduct,
  upload.single('image'),
  [
    validateRequiredFields([
      "product",
      "user",
      /*"name",
      "nameEn",
      "description",
      "descriptionEn",
      "featured",
      "barcode",
      "quantity",
      "retailer_price",
      "consumer_price",
      "type_id",*/
    ]),
  ],
  createProduct
);

/**
 * @swagger
 * /product/{_id}:
 *   put:
 *     summary: Update an existing product
 *     x-author: miandrs
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nameEn
 *               - description
 *               - descriptionEn
 *               - featured
 *               - barcode
 *               - quantity
 *               - retailer_price
 *               - consumer_price
 *               - type_id
 *             properties:
 *               name:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               description:
 *                 type: string
 *               descriptionEn:
 *                 type: string
 *               featured:
 *                 type: boolean
 *               barcode:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               retailer_price:
 *                 type: number
 *               consumer_price:
 *                 type: number
 *               type_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated
 * @author miandrs
 */
router.put(
  `${apiProduct}/:_id`,
  upload.single('image'),
  [
    validateRequiredFields([
      "product",
      "user"
      /*"name",
      "nameEn",
      "description",
      "descriptionEn",
      "featured",
      "barcode",
      "quantity",
      "retailer_price",
      "consumer_price",
      "type_id",*/
    ]),
  ],
  updateProduct
);

router.put(
  `${apiProduct}-restock/:_id`,
  [
    validateRequiredFields([
      "quantity"
    ]),
  ],
  restockProduct
);

const apiOrder = "/order";


  /**
 * @swagger
 * /order/{_id}:
 *   put:
 *     summary: Update an order status
 *     x-author: miandrs
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 * @author miandrs
 */
router.put(`${apiOrder}/:_id`, [
    validateRequiredFields([
        "status"
    ]),
    ], updateOrder);
    
/**
 * @swagger
 * /order/{_id}:
 *   get:
 *     summary: Get an order by ID
 *     x-author: miandrs
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 * @author miandrs
 */
router.get(`${apiOrder}/:_id`, getOrder);

/**
 * @swagger
 * /order/{_id}:
 *   get:
 *     summary: Get an order by ID
 *     x-author: miandrs
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: Order total
 * @author miandrs
 */
router.get(`${apiOrder}-total`, getTotalOrder);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     x-author: miandrs
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: List of orders
 * @author miandrs
 */
router.get(apiOrder, getAllOrder);

const apiOrderList = "/order-list";
/**
 * @swagger
 * /order-list/{_id}:
 *   get:
 *     summary: Get an order list by ID
 *     x-author: miandrs
 *     tags:
 *       - OrderList
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order list details
 * @author miandrs
 */
router.get(`${apiOrderList}/:_id`, getOrderList);

/**
 * @swagger
 * /order-list:
 *   get:
 *     summary: Get all order lists
 *     x-author: miandrs
 *     tags:
 *       - OrderList
 *     responses:
 *       200:
 *         description: List of order lists
 * @author miandrs
 */
router.get(apiOrderList, getAllOrderList);

router.get("/customer-total", getTotalCustomer);

router.get("/customer", getAllCustomer);

router.get("/customer/history", getAllCustomerHistory);

router.get("/top-selling", getAllTopSellingProduct);

router.get("/revenue", getRevenue);

const apiCountry = "/country";
/**
 * @swagger
 * /country:
 *   post:
 *     summary: Create a new country
 *     x-author: miandrs
 *     tags:
 *       - Country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country created
 * @author miandrs
 */
router.post(apiCountry, [validateRequiredFields(["name"])], createCountry);

const apiCity = "/city";
/**
 * @swagger
 * /city:
 *   post:
 *     summary: Create a new city
 *     x-author: miandrs
 *     tags:
 *       - City
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - region
 *               - province
 *             properties:
 *               name:
 *                 type: string
 *               region:
 *                 type: string
 *               province:
 *                 type: string
 *     responses:
 *       201:
 *         description: City created
 * @author miandrs
 */
router.post(apiCity, [
  validateRequiredFields([
      "name",
      "region",
      "province",
    ]),
  ],
  createCity
);

const apiPaymentType = "/payment-type";
/**
 * @swagger
 * /payment-type:
 *   post:
 *     summary: Create a new payment type
 *     x-author: miandrs
 *     tags:
 *       - PaymentType
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment type created
 * @author miandrs
 */
router.post(apiPaymentType, [
  validateRequiredFields([
      "name",
      "description",
    ]),
  ],
  createPaymentType
);

/**
 * @swagger
 * /payment-type/{_id}:
 *   put:
 *     summary: Update a payment type
 *     x-author: miandrs
 *     tags:
 *       - PaymentType
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment type updated
 * @author miandrs
 */
router.put(`${apiPaymentType}/:_id`, [
  validateRequiredFields([
      "name",
      "description",
    ]),
  ],
  updatePaymentType
);

const apiPayment = "/payment";
/**
 * @swagger
 * /payment/{_id}:
 *   get:
 *     summary: Get a payment by ID
 *     x-author: miandrs
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 * @author miandrs
 */
router.get(`${apiPayment}/:_id`, getPayment);

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     x-author: miandrs
 *     tags:
 *       - Payment
 *     responses:
 *       200:
 *         description: List of payments
 * @author miandrs
 */
router.get(apiPayment, getAllPayment);

const apiMvola = "/payment/mvola";
/**
 * @swagger
 * /payment/mvola/status:
 *   get:
 *     summary: Get Mvola transaction status
 *     x-author: miandrs
 *     tags:
 *       - Mvola
 *     responses:
 *       200:
 *         description: Transaction status
 * @author miandrs
 */
router.get(`${apiMvola}/status`, getTransactionStatus);

/**
 * @swagger
 * /payment/mvola/details:
 *   get:
 *     summary: Get Mvola transaction details
 *     x-author: miandrs
 *     tags:
 *       - Mvola
 *     responses:
 *       200:
 *         description: Transaction details
 * @author miandrs
 */
router.get(`${apiMvola}/details`, getTransactionDetails);

router.get("/contact", getContact);

export { router as protectedRoute };
