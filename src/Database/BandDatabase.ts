import { BaseDataBase } from "./BaseDataBase";
import {Band} from "../Model/Band"


export class BandDatabase extends BaseDataBase{
  public static TABLE_NAME = "USERS";

  public async createBand(
    id: string,
    name: string,
    nickname: string,
    email:string,
    password: string,
    description: string,
    isApproved: boolean = false,
    role: string
  ): Promise<void> {
    await this.getconnection()
      .insert({
        id,
        name,
        nickname,
        email,
        password,
        description,
        isApproved,
        role
      })
      .into(BandDatabase.TABLE_NAME);
  }
  public async getAllBand(): Promise<Band[]> {
    try{
      const result = await this.getconnection()
      .select("name", "nickname", "email", "isApproved")
      .from(BandDatabase.TABLE_NAME)
      .where({ role:"BAND"});
   
       return result;
       
    } catch(err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }
  public async toApprove(nickname:string) {
    try {
      await this.getconnection()
      .update({isApproved: "1"})
      .from(BandDatabase.TABLE_NAME)
      .where({nickname})
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
}
