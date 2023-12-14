import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { TypeUser } from "../@types/User";
/*
const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(400).json({
            message: "No token provided"
        })
    }

    const userCredentials =  jwt.verify(token,`${process.env.JWT_SECRET}`) as TypeUser
    const address = userCredentials.custodyAccountPublicKey
    console.log(address)
    if(!ethers.isAddress(address)){
        return res.status(400).json({
            message: "Invalid address"
        })
    }*/


export async function authenticated(req: Request, res: Response,next:NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(400).json({
            message: "No token provided"
        })
    }
    //to do tratamento de erro
    const userCredentials =  jwt.verify(token,`${process.env.JWT_SECRET}`) as TypeUser
    req.body.userCredentials = userCredentials
    next()
}