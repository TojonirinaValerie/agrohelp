import Country from "@/models/country";
import { RequestHandler, Request, Response, NextFunction } from "express";

export const createCountry: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        const checkCountry = await Country.findOne({ where: { name: name } });
        const country = Country.build({ name });
        if(!checkCountry) {
            await country.save();
            res.handler.dataCreated("Country created with success", country);
            return;
        } 
        res.handler.sendResponse({ 
            success: false,
            message: "Country name already exist",
            data: country,
            statusCode: 409
            });
    } catch (error) {
        next(error);
    }
}

export const getCountry: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params['_id'];

        const country = await Country.findByPk(id);

        res.handler.successRequest("Country found", { country: country });
    } catch (error) {
        next(error);
    }
}

export const getAllCountry: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await Country.findAll();

        res.handler.successRequest("Country collection found", { countries: countries });
    } catch (error) {
        next(error);
    }
}