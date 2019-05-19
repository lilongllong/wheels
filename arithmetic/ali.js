const input = '0-2;3-4;2-4;0-4;6-7;1-5;3-9;8-11;6-10;9-13;11-12'.split(';');
const numberOfSet = 15;

const unionSet = getSets(input, numberOfSet);
const [setdata, edges] = formateData(unionSet, input);

const lastData = setdata.map((item, index) => getLeaders(item, edges[index]))
const logData = lastData.map((item, index) => unionSet[index][item]);
logData.sort((a, b) => parseInt(a) - parseInt(b));

console.log(logData.join(','));

function getSets(input, numberOfSet) {
    const result = new Array(numberOfSet);
    const rank = new Array(numberOfSet);
    // 初始化父节点
    for (let i = 0; i < numberOfSet; i++) {
        result[i] = i;
        rank[i] = 0;
    }

    input.forEach(item => {
        const [x, y] = item.split('-').map(subItem => parseInt(subItem));
        union(x, y);
    });

    function union(x, y) {
        const px = find_set(x);
        const py = find_set(y);
        if (rank[px] <= rank[py]) {
            result[px] = py;
            if(rank[px] === rank[py]) rank[py]++;  
        } else {
            result[py] = px;
        }      
    }
    
    function find_set(x) {
        let y = x;
        while (result[y] != y) {
            y = result[y];	
        }
        let head = y;
        y = x;
        while (result[y] != y) {
            let temp = result[y];
            result[y] = head;
            y = temp;	
        }
	    return head;
    }
    const resultMap = {};
    result.forEach((item, index) => {
        const parentLeader = find_set(item);
        if (resultMap[parentLeader]) {
            resultMap[parentLeader].push(index);
        } else {
            resultMap[parentLeader] = [index];
        }
    });
    const resultArr = [];
    for (let key in resultMap) {
        resultArr.push(resultMap[key]);
    }
    return resultArr;
}

function getLeaders (Arr2, numEdges) {    
    let numVertexes = Arr2.length; 
    if (numVertexes === 1) {
        return 0;
    }
    function MGraph() {
        this.vexs = []; 
        this.arc = []; 
        this.numVertexes = null; 
        this.numEdges = null; 
    }
    let G = new MGraph(); 
    
    //创建图
    function createMGraph() {
        G.numVertexes = numVertexes; 
        G.numEdges = numEdges; 
        for (let i = 0; i < G.numVertexes; i++) {
            G.vexs[i] = 'V' + i; 
        }    
        for (let i = 0; i < G.numVertexes; i++) {
            G.arc[i] = [];
            for (j = 0; j < G.numVertexes; j++) {
                G.arc[i][j] = Arr2[i][j]; //INFINITY; 
            }
        }
    }
    
    let Pathmatirx = []; 
    let ShortPathTable = []; 
    
    function Floyd() {
    
        let w, k;
        for (let v = 0; v < G.numVertexes; ++v) { 
            Pathmatirx[v] = [];
            ShortPathTable[v] = [];
            for (let w = 0; w < G.numVertexes; ++w) {
                ShortPathTable[v][w] = G.arc[v][w];
                Pathmatirx[v][w] = w;
            }
        }
    
        for (let k = 0; k < G.numVertexes; ++k) {
            for (let v = 0; v < G.numVertexes; ++v) {
                for (let w = 0; w < G.numVertexes; ++w) {
                    if (ShortPathTable[v][w] > (ShortPathTable[v][k] + ShortPathTable[k][w])) {
                        //如果经过下标为k顶点路径比原两点间路径更短，当前两点间权值设为更小的一个
                        ShortPathTable[v][w] = ShortPathTable[v][k] + ShortPathTable[k][w];
                        Pathmatirx[v][w] = Pathmatirx[v][k]; //路径设置经过下标为k的顶点
                    }
                }
            }
        }
    }
    
    function getMinCost() {
        let resultIndex = 0;
        let minSum = Number.MAX_SAFE_INTEGER;
        for (let v = 0; v < G.numVertexes; ++v) {
            let itemSum = 0;
            for (let w = 0; w < G.numVertexes; w++) {
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

function formateData (splitArr, data) {
    const edges = [];
    const inIndex = splitArr.reduce((prev, curr, index) => {
        edges.push(0); // 初始化边数
        curr.forEach((subItem, subIndex) => { prev[subItem] = [index, subIndex]; })
        return prev;
    }, {});
    const dataMap = splitArr.map((item) => {
        return item.map((subItem, subIndex) => {
            const arr = [];
            for (let i = 0; i < item.length; i++) {
                arr.push(i === subIndex ? 0 : 65535);
            }
            return arr;
        });
    });
    
    data.forEach((item, index) => {
        const [x, y] = item.split('-').map(subItem => parseInt(subItem));
        if (x > y) {
            const tempValue = x;
            x = y;
            y = tempValue;
        }
        const [arrIndex, xSubArrIndex] = inIndex[x];
        const ySubArrIndex = inIndex[y][1];
        edges[arrIndex] += 1;
        dataMap[arrIndex][xSubArrIndex][ySubArrIndex] = 1;
        dataMap[arrIndex][ySubArrIndex][xSubArrIndex] = 1;
    });
    return [dataMap, edges];
}


