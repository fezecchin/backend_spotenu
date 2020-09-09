import { Request, Response } from "express";
import {BaseDataBase} from "../Database/BaseDataBase"
import { BandBusiness } from "../Bussiness/BandBusiness";

export class BandController {
  public async signupBand(req: Request, res: Response) {
    try {
        const bandData = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        role: req.body.role
      };
           
      const bandBusiness = new BandBusiness();
       await bandBusiness.signupBands(bandData.name, bandData.nickname, bandData.email, bandData.password, bandData.description, bandData.role) 

        res.status(200).send({
        message: "Band Created"
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    BaseDataBase.destroyConnection();
  }

 public async getAllBandList(req: Request, res: Response) {

    try {
      const bandBusiness = new BandBusiness();
      const result = await bandBusiness.getAllBand(req.headers.authorization!)
      res.status(200).send({
        result
      });

    } catch (error) {
        res.send({ message: error.message }).status(error.code);
    }
  }
}