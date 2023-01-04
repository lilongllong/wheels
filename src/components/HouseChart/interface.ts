export interface ISale {
  id: number;
  area:string;
  acreage: number;
  createTime: string;
  cycle: number;
  date: string;
  district: string;
  name: string;
  price: number;
  ref_id: number;
  roomCount: number;
  site: string;
  unitPrice: number;
}

export interface IPrice {
  acreage: number;
  changeDay: string;
  changePrice: number;
  changeRate: number;
  changeType: string;
  createTime: string;
  data: string;
  estate: string;
  houseId: string;
  id: number;
  layout: string;
  orientation: string;
  originalUrl: string;
  price: number;
  refPrice: number;
  refScale: number;
  ref_id: number;
  site: string;
  tags: string;
  title: string;
  unitPrice: number;
}

export interface IHouse {
  prices: IPrice[];
  sales: ISale[];
}

export interface IHouseResponse {
  code: number;
  data: IHouse;
}
