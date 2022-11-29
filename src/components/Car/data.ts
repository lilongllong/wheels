export interface ICarDetail {
  href?: string;
  title: string;
  image: string; // 车图片
  description: string;
  content: string;
  priority: {
    like: number,
    price: number,
    security: number,
    space: number,
  };
}

export enum EPriorityType {
  Like = ''
}

export const carData: ICarDetail[] = [{
  href: '',
  title: '凯迪拉克CT5',
  image: '',
  description: '',
  content: '描述凯迪拉克的一些特性',
  priority: {
    like: 1,
    price: 4,
    security: 1,
    space: 2,
  },
}]
