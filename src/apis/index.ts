import axios from 'axios';
import apis, { baseUrl } from './api';

export interface IHouseNominalPrice {
  id: number;
  ref_id: number;
  houseId: number;
  title: string;
  layout: string;
  acreage: number;
  orientation: string;
  estate: string;
  tags: string;
  refPrice: number;
  price: number;
  originalUrl: string;
  site: string;
  unitPrice: number;
  refScale: number;
  changeType: 'reduce' | 'rise',
  changePrice: number;
  changeRate: number;
  changeDay: number;
  createTime: string;
}

export interface IHouseSales {
  id: number;
  ref_id: number;
  area: string;
  name: string;
  roomCount: number;
  acreage: number;
  price: number;
  district: string;
  unitPrice: number;
  date: string;
  createTime: string;
}

export const fetchCommunity = async (value: { name: string }): Promise<{ success: boolean, data: { sales: IHouseSales[], prices: IHouseNominalPrice[] }, message?: string }> => {
  const res = await axios.request({
    method: apis.district_api.method,
    baseURL: baseUrl,
    url: apis.district_api.url,
    params: {
      name: value.name,
    }
  });
  if (res.status === 200 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: { sales: [], prices: [] }, message: res.data.message };
  }
}

export const fetchAllCommunityName = async (value: { district?: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const res = await axios.request({
    method: apis.community_api.method,
    baseURL: baseUrl,
    url: apis.community_api.url,
    params: {
      district: value.district,
    }
  });
  if (res.status === 200 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: [], message: res.data.message };
  }
}
