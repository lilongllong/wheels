"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * 设计个通用页面头部
 */
// import React from 'react';
var style_less_1 = require("./style.less");
function PageHeader(props) {
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: style_less_1.default['wheels-page-header'] }, { children: ["\u6807\u51C6\u9875\u9762\u5934\u90E8", (0, jsx_runtime_1.jsx)("p", { children: props.title }, void 0), (0, jsx_runtime_1.jsx)("p", { children: props.logo }, void 0), (0, jsx_runtime_1.jsx)("p", { children: props.actions.join(',') }, void 0)] }), void 0));
}
exports.default = PageHeader;
//# sourceMappingURL=index.js.map