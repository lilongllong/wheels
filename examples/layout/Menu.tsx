import React from 'react';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import menuData, { IMenuItem } from '../config/menu';

const { Item: MenuItem, SubMenu } = Menu;


export default function MenuContainer() {
  const renderMenuItem = (item: IMenuItem) => {
    console.log(item, item);
    if (item.children) {
      return (
        <SubMenu title={item.label}>
          {(item.children || []).map(subItem => (
            <MenuItem key={subItem.key}>
              <Link to={subItem.path as string}>{subItem.label}</Link>
            </MenuItem>
        ))}
        </SubMenu>
      );
    }
    return (
      <MenuItem key={item.key}>
        <Link to={item.path as string}>{item.label}</Link>
      </MenuItem>
    );
  }
  console.log(menuData, 'menuData');
  return (
    <Menu mode='inline'>
      {(menuData || []).map((item) => renderMenuItem(item))}
    </Menu>
  );
}