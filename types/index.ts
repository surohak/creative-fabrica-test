export interface ICreator {
  id: string;
  email: string;
}

export interface IProduct {
  id: string;
  creatorId: string;
  createTime: string;
}

export interface IData {
  Creators: ICreator[];
  Products: IProduct[];
}

export type ProductsByCreatorId = { [key: string]: IProduct[] };
