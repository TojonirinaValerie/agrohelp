import Category from "@/models/category";
import ProductType from "@/models/product-type";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const createType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, category_id } = req.body;

        const type = ProductType.build({
            name,
            description,
            CategoryId: category_id,
        });
        
        await type.save();

        res.handler.dataCreated("Type created with success", { type: type.toJSON() });
    } catch(error) {
        next(error);
    }
}

export const getType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params['_id'];
        
        const type = await ProductType.findByPk(_id, { include: [{model: Category, as: 'category',}] });

        res.handler.successRequest("Type found", { type: type });
    } catch (error) {
        next(error);
    }
}

export const getAllType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await ProductType.findAll({
            include: [
                {
                model: Category,
                as: 'category', // use if you defined alias
                },
            ],
        });

        res.handler.successRequest("Type Collection", { types: types });
        return;
    } catch (error) {
        next(error);
    }
}

export const getProductType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params['_id'];
        
        const type = await ProductType.findByPk(_id);

        res.handler.successRequest("Type found", { type: type });
    } catch (error) {
        next(error);
    }
}

export const getAllProductType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await ProductType.findAll();

        res.handler.successRequest("Type Collection", { types: types });
        return;
    } catch (error) {
        next(error);
    }
}

export const updateType: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const _id = req.params['_id'];
        const { name, description, category_id } = req.body;

        const updatedType = await ProductType.findByPk(_id);
        if(!updatedType) {
            res.handler.notFound("Type not found", null);
            return;
        } else {
            updatedType.name = name; 
            updatedType.description = description; 
            updatedType.categoryId = category_id;

            await updatedType.save();
        }
        res.handler.successRequest("Type updated with success", { type: updatedType.toJSON() });
        return;
    } catch(error) {
        next(error);
    }
}