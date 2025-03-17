export class User {
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath: string | null;
    group: Group;
    creationDate: Date;
    modificationDate: Date;
  
    constructor(data: Partial<User>) {
      this.id = data.id ?? 0;
      this.userName = data.userName ?? '';
      this.email = data.email ?? '';
      this.country = data.country ?? '';
      this.phoneNumber = data.phoneNumber ?? '';
      this.imagePath = data.imagePath ?? null;
      this.group = new Group(data.group ?? {});
      this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
      this.modificationDate = data.modificationDate ? new Date(data.modificationDate) : new Date();
    }
  }
  
  export class Group {
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
  
    constructor(data: Partial<Group>) {
      this.id = data.id ?? 0;
      this.name = data.name ?? '';
      this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date();
      this.modificationDate = data.modificationDate ? new Date(data.modificationDate) : new Date();
    }
  }
  