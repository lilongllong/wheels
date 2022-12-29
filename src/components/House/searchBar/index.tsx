import React, { FC, useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { fetchAllCommunityName } from '@/apis/index';

import styles from './styles.less';


interface IProps {
  onChange: (values: { name: string; }) => void
}

const SearchBar: FC<IProps>  = function (props) {
  const { onChange } = props;
  const [districtName, setDistricName] = useState('万象新天');
  const [communityNames, setCommunityNames] = useState<string[]>([]);

  useEffect(() => {
    fetchAllCommunityName({}).then((res) => {
      setCommunityNames(res.data.map(item => item.name));
    });
  }, []);

  const handleNameChange = (value: string) => {
    setDistricName(value);
  }
  return (
    <div className={styles.searchBar}>
      <div className={styles.item}>
        <label>小区名称</label>
        <Select
          className={styles.communitySelector}
          defaultValue={districtName}
          value={districtName}
          onChange={handleNameChange}
          showSearch
          style={{ width: 200 }}
          options={communityNames.map((item: string) => ({
            value: item,
            label: item,
          }))}
        />
        <Input
          className={styles.communitySelector}
          defaultValue={districtName}
          value={districtName}
          onChange={(e) => handleNameChange(e.target.value)}
          // showSearch
          style={{ width: 200 }}
          // options={communityNames.map((item: string) => ({
          //   value: item,
          //   label: item,
          // }))}
        />
      </div>
      <Button onClick={() => onChange({ name: districtName })}>开始分析</Button>
    </div>
  );
}

export default SearchBar;

