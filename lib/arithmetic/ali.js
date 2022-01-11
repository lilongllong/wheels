"use strict";
var input = '0-2;3-4;2-4;0-4;6-7;1-5;3-9;8-11;6-10;9-13;11-12'.split(';');
var numberOfSet = 15;
var unionSet = getSets(input, numberOfSet);
var _a = formateData(unionSet, input), setdata = _a[0], edges = _a[1];
var lastData = setdata.map(function (item, index) { return getLeaders(item, edges[index]); });
var logData = lastData.map(function (item, index) { return unionSet[index][item]; });
logData.sort(function (a, b) { return parseInt(a) - parseInt(b); });
console.log(logData.join(','));
function getSets(input, numberOfSet) {
    var result = new Array(numberOfSet);
    var rank = new Array(numberOfSet);
    // 初始化父节点
    for (var i_1 = 0; i_1 < numberOfSet; i_1++) {
        result[i_1] = i_1;
        rank[i_1] = 0;
    }
    input.forEach(function (item) {
        var _a = item.split('-').map(function (subItem) { return parseInt(subItem); }), x = _a[0], y = _a[1];
        union(x, y);
    });
    function union(x, y) {
        var px = find_set(x);
        var py = find_set(y);
        if (rank[px] <= rank[py]) {
            result[px] = py;
            if (rank[px] === rank[py])
                rank[py]++;
        }
        else {
            result[py] = px;
        }
    }
    function find_set(x) {
        var y = x;
        while (result[y] != y) {
            y = result[y];
        }
        var head = y;
        y = x;
        while (result[y] != y) {
            var temp = result[y];
            result[y] = head;
            y = temp;
        }
        return head;
    }
    var resultMap = {};
    result.forEach(function (item, index) {
        var parentLeader = find_set(item);
        if (resultMap[parentLeader]) {
            resultMap[parentLeader].push(index);
        }
        else {
            resultMap[parentLeader] = [index];
        }
    });
    var resultArr = [];
    for (var key_1 in resultMap) {
        resultArr.push(resultMap[key_1]);
    }
    return resultArr;
}
function getLeaders(Arr2, numEdges) {
    var numVertexes = Arr2.length;
    if (numVertexes === 1) {
        return 0;
    }
    function MGraph() {
        this.vexs = [];
        this.arc = [];
        this.numVertexes = null;
        this.numEdges = null;
    }
    var G = new MGraph();
    //创建图
    function createMGraph() {
        G.numVertexes = numVertexes;
        G.numEdges = numEdges;
        for (var i_2 = 0; i_2 < G.numVertexes; i_2++) {
            G.vexs[i_2] = 'V' + i_2;
        }
        for (var i_3 = 0; i_3 < G.numVertexes; i_3++) {
            G.arc[i_3] = [];
            for (j = 0; j < G.numVertexes; j++) {
                G.arc[i_3][j] = Arr2[i_3][j]; //INFINITY; 
            }
        }
    }
    var Pathmatirx = [];
    var ShortPathTable = [];
    function Floyd() {
        var w, k;
        for (var v = 0; v < G.numVertexes; ++v) {
            Pathmatirx[v] = [];
            ShortPathTable[v] = [];
            for (var w_1 = 0; w_1 < G.numVertexes; ++w_1) {
                ShortPathTable[v][w_1] = G.arc[v][w_1];
                Pathmatirx[v][w_1] = w_1;
            }
        }
        for (var k_1 = 0; k_1 < G.numVertexes; ++k_1) {
            for (var v = 0; v < G.numVertexes; ++v) {
                for (var w_2 = 0; w_2 < G.numVertexes; ++w_2) {
                    if (ShortPathTable[v][w_2] > (ShortPathTable[v][k_1] + ShortPathTable[k_1][w_2])) {
                        //如果经过下标为k顶点路径比原两点间路径更短，当前两点间权值设为更小的一个
                        ShortPathTable[v][w_2] = ShortPathTable[v][k_1] + ShortPathTable[k_1][w_2];
                        Pathmatirx[v][w_2] = Pathmatirx[v][k_1]; //路径设置经过下标为k的顶点
                    }
                }
            }
        }
    }
    function getMinCost() {
        var resultIndex = 0;
        var minSum = Number.MAX_SAFE_INTEGER;
        for (var v = 0; v < G.numVertexes; ++v) {
            var itemSum = 0;
            for (var w = 0; w < G.numVertexes; w++) {
                itemSum += ShortPathTable[v][w];
            }
            if (minSum > itemSum) {
                minSum = itemSum;
                resultIndex = v;
            }
        }
        return resultIndex;
    }
    createMGraph();
    Floyd();
    return getMinCost();
}
function formateData(splitArr, data) {
    var edges = [];
    var inIndex = splitArr.reduce(function (prev, curr, index) {
        edges.push(0); // 初始化边数
        curr.forEach(function (subItem, subIndex) { prev[subItem] = [index, subIndex]; });
        return prev;
    }, {});
    var dataMap = splitArr.map(function (item) {
        return item.map(function (subItem, subIndex) {
            var arr = [];
            for (var i_4 = 0; i_4 < item.length; i_4++) {
                arr.push(i_4 === subIndex ? 0 : 65535);
            }
            return arr;
        });
    });
    data.forEach(function (item, index) {
        var _a = item.split('-').map(function (subItem) { return parseInt(subItem); }), x = _a[0], y = _a[1];
        if (x > y) {
            var tempValue = x;
            x = y;
            y = tempValue;
        }
        var _b = inIndex[x], arrIndex = _b[0], xSubArrIndex = _b[1];
        var ySubArrIndex = inIndex[y][1];
        edges[arrIndex] += 1;
        dataMap[arrIndex][xSubArrIndex][ySubArrIndex] = 1;
        dataMap[arrIndex][ySubArrIndex][xSubArrIndex] = 1;
    });
    return [dataMap, edges];
}
//# sourceMappingURL=ali.js.map