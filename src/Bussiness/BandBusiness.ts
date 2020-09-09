import { BandDatabase } from "../Database/BandDatabase";
import IdGenerator from "../Services/IdGenerator";
import Authenticator from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";

export class BandBusiness {
  async signupBands(name: string, nickname:string, email: string,
    password: string, description:string, role:string ) {

        if (!name || !email || !password || !description || !nickname)
        {
          throw new Error("Invalid input");
        }
        if (email.indexOf("@") === -1) {
          throw new Error("Invalid email address");
        }
        if (password.length < 6) {
          throw new Error("Password must have at least 6 characters");
        }
       

    const hashManager = new HashManager();
    const cipherText = await hashManager.hash(password);

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const bandDatabase = new BandDatabase();
    await bandDatabase.createBand (id, name,  nickname, email, cipherText, description, false, role);

  }

  public async getAllBand(token:string){
    if(!token) {
      throw new Error ("missing access token");
    }

    const authenticator = new Authenticator();
    const tokenData = authenticator.getData(token);

    if(tokenData.role !== "ADMIN"){
      throw new Error ("Only ADMIN");
    }
    const bandDatabase = new BandDatabase();
    const result = await bandDatabase.getAllBand();

    return result;
  }
}