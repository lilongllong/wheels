var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * 设计个通用页面头部
 */
// import React from 'react';
import styles from './style.less';
export default function PageHeader(props) {
    return (_jsxs("div", __assign({ className: styles['wheels-page-header'] }, { children: ["\u6807\u51C6\u9875\u9762\u5934\u90E8", _jsx("p", { children: props.title }, void 0), _jsx("p", { children: props.logo }, void 0), _jsx("p", { children: props.actions.join(',') }, void 0)] }), void 0));
}
//# sourceMappingURL=index.js.map