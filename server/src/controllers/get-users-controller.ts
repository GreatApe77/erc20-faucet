import {Request,Response,NextFunction} from "express"
import { getUsersRepository } from "../repositories/get-users-repository"

export async function getUsersController(req: Request, res: Response,next:NextFunction) {
    try {
        const page = req.query.page as string;
        const pageSize = req.query.pageSize as string;
        const users = await getUsersRepository(Number(page),Number(pageSize));
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        next(error);
    }
}