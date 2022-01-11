var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Service from "./Service";
mapAsync();
function mapAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var service, arr, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service = new Service();
                    arr = [1, 2, 3, 4, 5];
                    return [4 /*yield*/, Promise.all(arr.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var newData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, service.getDataFromIndex(item)];
                                    case 1:
                                        newData = _a.sent();
                                        return [2 /*return*/, newData];
                                }
                            });
                        }); }))];
                case 1:
                    result = _a.sent();
                    console.log(result, "map");
                    return [2 /*return*/];
            }
        });
    });
}
filterAsync();
function filterAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var service, arr, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service = new Service();
                    arr = [1, 2, 3, 4, 5];
                    return [4 /*yield*/, arr.filter(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var newData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, service.getDataFromIndex(item)];
                                    case 1:
                                        newData = _a.sent();
                                        return [2 /*return*/, newData === item * 10];
                                }
                            });
                        }); })];
                case 1:
                    result = _a.sent();
                    console.log(result, "filter");
                    return [2 /*return*/];
            }
        });
    });
}
reduceAsync();
function reduceAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var service, arr, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service = new Service();
                    arr = [1, 2, 3, 4, 5];
                    return [4 /*yield*/, arr.reduce(function (prev, cur) { return __awaiter(_this, void 0, void 0, function () {
                            var newData, newPrev;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, service.getDataFromIndex(cur)];
                                    case 1:
                                        newData = _a.sent();
                                        return [4 /*yield*/, prev];
                                    case 2:
                                        newPrev = _a.sent();
                                        newPrev.push(newData);
                                        return [2 /*return*/, newPrev];
                                }
                            });
                        }); }, new Array())];
                case 1:
                    result = _a.sent();
                    console.log(result, "reduce");
                    return [2 /*return*/];
            }
        });
    });
}
forEachAsync();
function forEachAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var service, arr, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    service = new Service();
                    arr = [1, 2, 3, 4, 5];
                    result = [];
                    return [4 /*yield*/, arr.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var newData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, service.getDataFromIndex(item)];
                                    case 1:
                                        newData = _a.sent();
                                        result.push(newData);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    console.log(result, "forEach");
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.js.map