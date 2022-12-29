import React from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';

import type { ColumnsType } from 'antd/es/table';

import { IHouseSales } from '@/apis/index';

function getDistinctName(data: IHouseSales[]): { text: string; value: string }[] {
    const strs = (data || []).map(item => item.name);
    return Array.from(new Set(strs)).map(item => ({ text: item, value: item }));
}

export default function SaleTable(props: { data: IHouseSales[], onAction: (type: string, record: IHouseSales) => void }) {
    const OperationDiv = styled.div`
        display: inline-flex;
        width: 120px;
        flex-direction: row;
        justify-content: space-between;
    `;
    const cols: ColumnsType<IHouseSales> = [
        { title: 'id', dataIndex: 'id' },
        {
            title: '小区',
            dataIndex: 'name',
            filterMode: 'menu',
            filters: getDistinctName(props.data),
            filterSearch: true,
            onFilter: (value, record: IHouseSales) => record.name.startsWith(value as string),
        },
        { title: '总价', dataIndex: 'price', render: (value) => `${value}万元`, sorter: (a, b) => a.price - b.price, },
        { title: '单价', dataIndex: 'unitPrice', render: (value) => `${value}万元`, sorter: (a, b) => a.unitPrice - b.unitPrice, },
        { title: '户型', dataIndex: 'roomCount', render: (value) => `${value}室`, sorter: (a, b) => a.unitPrice - b.unitPrice },
        { title: '面积', dataIndex: 'acreage', render: (value) => `${value}平方米`, sorter: (a, b) => a.acreage - b.acreage },
        { title: '社区', dataIndex: 'district' },
        { title: '出售时间', dataIndex: 'date', sorter: (a, b) => Number(a.date.slice(0, 7).replace('-', '')) - Number(b.date.slice(0, 7).replace('-', '')) },
        { title: '操作', dataIndex: 'id', render: (_, record) => {
            return (<OperationDiv>
                <Button type='primary' onClick={() => { props.onAction('showMore', record) }}>查看详细分析</Button>
            </OperationDiv>)
        } }
    ];
    return (
        <Table columns={cols} dataSource={props.data} />
    );
}
