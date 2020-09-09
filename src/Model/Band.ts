export enum UserType {
  BAND = "BAND",
  PAYING_LISTENER = "PAYING_LISTENER",
  NO_PAYING_LISTENER = "NO_PAYING_LISTENER",
  ADMIN = "ADMIN"
}

export class Band{
 
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private description: string,
    private isApproved: boolean = false,
    private role: UserType
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getNickName(): string {
    return this.nickname;
  }

  getDescription(): string {
    return this.description;
  }

  getIsApproved(): boolean{
    return this.isApproved;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): string {
    return this.role;
  }
}

