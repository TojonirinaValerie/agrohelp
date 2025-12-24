import City from "@/models/city";
import { RequestHandler, Request, Response, NextFunction } from "express";

export const createCity: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, region, province} = req.body;

        const city = City.build({
            name,
            region,
            province
        });

        await city.save();

        res.handler.dataCreated("City created with success", { city: city });
    } catch (error) {
        next(error);
    }
}

export const getCity: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];

        const city = await City.findByPk(id);
        
        res.handler.successRequest("City found", { city: city });
    } catch (error) {
        next(error);
    }
} 

export const getAllCity: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cities = await City.findAll();
        
        res.handler.successRequest("City collection found", { cities: cities });
    } catch (error) {
        next(error);
    }
} 