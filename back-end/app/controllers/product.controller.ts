import Category from "@/models/category";
import Product from "@/models/product";
import ProductType from "@/models/product-type";
import User from "@/models/user";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { UUIDV4 } from "sequelize";

export const createProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    console.log('====================================');
    console.log("product");
    console.log('====================================');
    try {
        const {name, nameEn, description, descriptionEn, barcode, featured, quantity, retailer_price, consumer_price, typeId } = JSON.parse(req.body.product);
        const { id } = JSON.parse(req.body.user);
        const user_id = id;
        const type = await ProductType.findByPk(typeId);
        const file = req.file;
        let imageUrl;
        const in_stock = quantity > 0 ? true : false;

        if(!type) {
            res.handler.notFound("cannot create Product because Type not found", {name, nameEn, description, descriptionEn, imageUrl, barcode, featured, in_stock, quantity, retailer_price, consumer_price, typeId });
            return;
        }

        if (file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        }

        const product = Product.build({
            name, 
            nameEn,
            description,
            descriptionEn, 
            image: imageUrl, 
            barcode, 
            in_stock, 
            quantity, 
            retailer_price, 
            consumer_price,
            featured, 
            typeId: typeId,
            userId: user_id 
        });

        await product.save();

        res.handler.dataCreated("Product created with success", { product: product.toJSON() });
        return;
    } catch (error) {
        next(error);
    }
}

export const updateProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, nameEn, description, descriptionEn, barcode, featured, quantity, retailer_price, consumer_price, typeId } = JSON.parse(req.body.product);
        const { id } = JSON.parse(req.body.user);
        // console.log(req.body);
        const user_id = id;
        console.log("user_id=> ", user_id);
        const productId = req.params['_id'];
        const file = req.file;
        let imageUrl;

        const type = await ProductType.findByPk(typeId);

        const in_stock = quantity > 0 ? true : false;
        
        if(!type) {
            res.handler.notFound("cannot update Product because Type not found", {name, nameEn, description, descriptionEn, imageUrl, barcode, quantity, retailer_price, consumer_price, typeId, featured });
            return;
        }
        
        const checkProduct = await Product.findByPk(id);
        if (!file) {
            imageUrl = checkProduct?.image;
        } else {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        }

        const updatedProduct = await Product.findByPk(productId);

        if(!updatedProduct) {
            res.handler.notFound("Product not found", null);
            return;
        } else {
            updatedProduct.name = name; 
            updatedProduct.nameEn = nameEn;
            updatedProduct.description = description;
            updatedProduct.descriptionEn = descriptionEn; 
            updatedProduct.barcode = barcode; 
            updatedProduct.in_stock = in_stock; 
            updatedProduct.quantity = quantity;
            updatedProduct.image = imageUrl; 
            updatedProduct.retailer_price = retailer_price; 
            updatedProduct.consumer_price = consumer_price;
            updatedProduct.featured = featured; 
            updatedProduct.typeId = typeId;
            updatedProduct.userId = user_id;
            
            await updatedProduct.save();
        }
        res.handler.successRequest("Product updated with success", { product: updatedProduct.toJSON() });
        return;
    } catch (error) {
        next(error);
    }
}

export const restockProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quantity = req.body.quantity;
        const user = req.body.user;
        const user_id = user.id;
        const _id = req.params['_id'];
        const in_stock = quantity > 0 ? true : false;

        const updatedProduct = await Product.findByPk(_id); 
        const checkUser = await User.findByPk(user_id);
        
        if(!updatedProduct || !checkUser) {
            res.handler.notFound("Product or User not found", null);
            return;
        } else {
            updatedProduct.in_stock = in_stock; 
            updatedProduct.quantity += quantity; 
            updatedProduct.userId = user_id;

            await updatedProduct.save();
        }
        res.handler.successRequest("Product updated with success", { product: updatedProduct.toJSON() });
        return;
    } catch (error) {
        next(error);
    }
}

export const getProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params['_id'];
        const product = await Product.findByPk(_id);
        res.handler.successRequest("Product found", { product: product?.toJSON() });
    } catch (error) {
        next(error);
    }
}

export const getAllProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll();
        res.handler.successRequest("Product collection", { products: products });
    } catch (error) {
        next(error);
    }
}

export const getAllProductDasboard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductType,
                    as: 'type',
                },
            ],
        });
        res.handler.successRequest("Product collection", { products: products });
    } catch (error) {
        next(error);
    }
}

export const getTotalProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productsTotal = await Product.count();
        res.handler.successRequest("Total Products collection", { productsTotal: productsTotal });
    } catch (error) {
        next(error);
    }
}

export const getAllFeaturedProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.findAll({ where: { featured: true } });
        res.handler.successRequest("Featured Product collection", { products: products });
    } catch (error) {
        next(error);
    }
}

export const getAllProductByProductType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];
        const products = await Product.findAll({ where: { typeId: id } });
        res.handler.successRequest("Product collection", { products: products });
    } catch (error) {
        next(error);
    }
}
