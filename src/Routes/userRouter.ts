import express from "express";
import { UserController } from "../Controller/UserController";
import { BandController } from "../Controller/BandController";

export const userRouter = express.Router();

export const controller = new UserController();

export const bandController = new BandController();


userRouter.post("/", controller.signupUser);
userRouter.post("/signupAdmin", controller.signupAdmin);
userRouter.post("/login", controller.login);
userRouter.post("/signupBand", bandController.signupBand)
userRouter.get("/allBands", bandController.getAllBandList)