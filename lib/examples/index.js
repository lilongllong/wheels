"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_dom_1 = require("react-dom");
var index_1 = require("../src/index");
var renderApp = function () {
    react_dom_1.default.render((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(index_1.PageHeader, { title: "\u6D4B\u8BD5", logo: "https://www.antdv.com", actions: ['a', 'n'] }, void 0), "wabgashjah"] }, void 0), document.querySelector('#root'));
};
// 单独 App 运行
renderApp();
//# sourceMappingURL=index.js.map