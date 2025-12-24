import Category from "@/models/category";
import type { Response, Request, NextFunction, RequestHandler } from "express";

export const createCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;

        const category = Category.build({
            name,
            description,
        });

        await category.save();

        res.handler.dataCreated(
            "Category created with success", 
            { category: category.toJSON()  }
        );
        return;
    } catch (error) {
        next(error);       
    }
} 

export const getCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params['_id'];

        const category = await Category.findByPk(_id);
        
        res.handler.successRequest(
            "Category found", 
            { category: category?.toJSON() }
        );
        return;
    } catch (error) {
        next(error);   
    }
}

export const getAllCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const categories = await Category.findAll();
        
        res.handler.successRequest(
            "Category collections", 
            { categories: categories }
        );
        return;
    } catch (error) {
        next(error);   
    }
}

export const updateCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _id = req.params['_id'];

        const { name, description } = req.body;

        const updatedCategory = await Category.findByPk(_id);
        
        if(!updatedCategory) {
            res.handler.notFound("Category not found", null);
            return;
        } else {
            updatedCategory.name = name; 
            updatedCategory.description = description;

            await updatedCategory.save();
        }
        res.handler.successRequest("Category updated", { category: updatedCategory?.toJSON() });
        return;
    } catch(error) {
        next(error);
    }
}