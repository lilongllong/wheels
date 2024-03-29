import axios from 'axios';
import apis, { baseUrl } from './api';
import { HouseDataBaseClass } from './module';

export class HouseNominalPriceClass extends HouseDataBaseClass {
  constructor() {
    super();
  }
  star(): boolean {
    return false;
  }
  unstar(): boolean {
    return false
  }
}


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

export const fetchDistrictName = async (): Promise<{ success: boolean, data: string[], message?: string }> => {
  const res = await axios.request({
    method: apis.district_name_api.url,
    baseURL: baseUrl,
    url: apis.district_name_api.url,
    params: {}
  });
  if (res.status === 200 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: [], message: res.data.message };
  }
}

export const filterSaleInfoByParams = async (params: any): Promise<{ success: boolean, data?: IHouseSales[], message?: string }> => {
  const res = await axios.request({
    method: apis.filter_sales_api.method,
    baseURL: baseUrl,
    url: apis.filter_sales_api.url,
    data: params,
  });
  console.log(res, 'res');
  if (res.status === 201 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: [], message: res.data.message };
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

export const downloadPagePdf = async (value: { url: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const res = await axios.request({
    method: apis.downloadPagePdf.method,
    baseURL: baseUrl,
    url: apis.downloadPagePdf.url,
    data: {
      url: value.url,
    }
  });
  console.log(res, 'res');
  const type = res.headers['content-type'];
    const blob = new Blob([res.data], { type: type })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'file.pdf'
    link.click()
  if (res.status === 200 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: [], message: res.data.message };
  }
}

export const downloadPageImage = async (value: { url: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const res = await axios.request({
    method: apis.downloadPageImage.method,
    baseURL: baseUrl,
    url: apis.downloadPageImage.url,
    data: {
      url: value.url,
    }
  });
  console.log(res, 'res');
  const type = res.headers['content-type'];
    const blob = new Blob([res.data], { type: type })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'file.png'
    link.click()
  if (res.status === 200 && res.data?.code === 0) {
    return { success: true, data: res.data.data };
  } else {
    return { success: false, data: [], message: res.data.message };
  }
}

export const linkPagePdf = async (value: { url: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const link = document.createElement('a')
  link.href = `${baseUrl}${apis.PagePDFLink.url}?url=${encodeURIComponent(value.url)}`
  link.download = 'file.pdf'
  link.click()
  return Promise.resolve({ success: true, data: [] });
}

export const linkPageImage = async (value: { url: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const link = document.createElement('a')
  link.href = `${baseUrl}${apis.PageImageLink.url}?url=${encodeURIComponent(value.url)}`
  link.download = 'file.png'
  link.click()
  return Promise.resolve({ success: true, data: [] });
}

export const downloadFile = async (value: { fileName: string }): Promise<{ success: boolean, data: { name: string }[], message?: string }> => {
  const link = document.createElement('a')
  link.href = `${baseUrl}${apis.download.url}?fileName=${encodeURIComponent(value.fileName)}`
  link.click()
  return Promise.resolve({ success: true, data: [] });
}
