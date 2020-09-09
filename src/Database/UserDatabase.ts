import { BaseDataBase } from "./BaseDataBase";
import {User} from "../Model/User"
import { Band } from "../Model/Band";

export class UserDatabase extends BaseDataBase {
 
  public static TABLE_NAME = "USERS";

  public async createUser(
    id: string,
    name: string,
    nickname: string,
    email:string,
    password: string,
    role: string
  ): Promise<void> {
    await this.getconnection()
      .insert({
        id,
        name,
        nickname,
        email,
        password,
        role
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserNickname(nickname: string): Promise<User> {
    const result = await this.getconnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ nickname});
    const data = result[0];
    const user = new User(data.id, data.name, data.email, data.nickname, data.password, data.role);
    return user;
  }

  // public async getPassword(password: string): Promise<any> {
  //   const result = await this.getconnection()
  //     .select("*")
  //     .from(UserDatabase.TABLE_NAME)
  //     .where({ password });

  //   return result[0];
  // }

  public async deleteUser(id: string): Promise<void> {
    await this.getconnection().raw(`
    DELETE FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);
  }

  public async getInfoById(id: string): Promise<any> {
    const info = await this.getconnection().raw(`
    SELECT id, email FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);

    return info[0];
  }

  


}
