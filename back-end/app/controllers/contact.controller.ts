import Contact from "@/models/contact";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const createContact: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        let finalSubject = '';
        if(subject === 'product') {
            finalSubject = 'Information sur un produit';
        } else if(subject === 'order') {
            finalSubject = 'Question sur une commande';
        } else if(subject === 'feedback') {
            finalSubject = 'Commentaires';
        } else if(subject === 'partnership') {
            finalSubject = 'Partenariat';
        } else {
            finalSubject = 'Autre';
        }
        /*
        const transporter = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO,
            subject: finalSubject,
            text: message,
        });
        */
        const contact = await Contact.create({
            name,
            email,
            phone,
            subject: finalSubject,
            message
        });
        res.handler.successRequest("Message sent successfully.");
    } catch (error) {
        next(error);
    }
}

export const getContact: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await Contact.findAll();
        res.handler.successRequest("Message sent successfully.", { contacts: contacts });
    } catch (error) {
        next(error);
    }
}