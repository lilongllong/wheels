import { MenuProps } from 'antd';
import { TableOutlined } from '@ant-design/icons';

export interface IMenuItem {
  key: string;
  label: string;
  path?: string;
  children?: IMenuItem[];
  icon?: React.FC;
  visible?: boolean; // 是否可见，默认为 true
  childrenVisible?: boolean; // 是否展示为下拉菜单，默认为 true
}

export const routerPath = {
  HOME: '/home',
  HOUSE: '/house',
  HOUSE_SHENZHENG: '/house/shenzhen',
  HOUSE_HAIKOU: '/house/haikou',
  CAR: '/car',
  CAR_SHENZHENG: '/car/shenzhen',
  CAR_HAIKOU: '/car/haikou',
  HOUSE_VISUALIZATION: '/house/visualization',
};

const menuData: IMenuItem[] = [
  {
    key: 'home',
    label: '家庭工具坊',
    icon: TableOutlined,
    path: routerPath.HOME,
  },
  {
    key: 'house',
    label: '购房',
    icon: TableOutlined,
    path: routerPath.HOUSE,
    children: [{
      key: 'house_shenzhen',
      label: '深圳购房分析',
      icon: TableOutlined,
      path: routerPath.HOUSE_SHENZHENG,
    }, {
      key: 'house_haikou',
      label: '海口购房分析',
      icon: TableOutlined,
      path: routerPath.HOUSE_HAIKOU,
    }, {
      key: 'house_analyze',
      label: '可视化分析',
      icon: TableOutlined,
      path: routerPath.HOUSE_VISUALIZATION,
    }]
  },
  {
    key: 'car',
    label: '购车',
    icon: TableOutlined,
    path: routerPath.CAR,
  }
];


export default menuData;
