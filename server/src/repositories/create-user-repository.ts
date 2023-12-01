import mongoose from "mongoose";
import { TypeUser } from "../@types/User";
import User from "../models/User";

export async function createUserRepository(user: TypeUser){
    const newUser = new User(user);
    await newUser.save()
    return newUser
}