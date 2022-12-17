export interface IBranchConfig {
    key: string; // 字段值
    name: string; // 字段名称
    type: number | string; // 字段类型
    defaultValue?: any; // 默认值
    defaultOperation?: EBranchOperation;
}

export enum EBranchOperation {
    EQUAL = 'equal',
    NOT_EQUAL = 'not_equal',
    LESS_THAN = 'less_than',
    MORE_THAN = 'more_than',
}
