import Service from "./Service";

mapAsync();
async function mapAsync() {

    const service = new Service();
    const arr = [1, 2, 3, 4, 5];
    const result = await Promise.all(arr.map(async (item) => {
        const newData = await service.getDataFromIndex(item);
        return newData;
    }));
    console.log(result, "map");
}

filterAsync();

async function filterAsync() {

    const service = new Service();
    const arr = [1, 2, 3, 4, 5];
    const result = await arr.filter(async (item) => {
        const newData = await service.getDataFromIndex(item);
        return newData === item * 10;
    });
    console.log(result, "filter");
}

reduceAsync();

async function reduceAsync() {

    const service = new Service();
    const arr = [1, 2, 3, 4, 5];
    const result = await arr.reduce(async (prev, cur) => {
        const newData = await service.getDataFromIndex(cur);
        const newPrev = await prev;
        newPrev.push(newData);
        return newPrev;
    }, new Array());
    console.log(result, "reduce");
}

forEachAsync();

async function forEachAsync()
{
    const service = new Service();
    const arr = [1, 2, 3, 4, 5];
    const result = [];
    await arr.forEach(async (item) => {
        const newData = await service.getDataFromIndex(item);
        result.push(newData);
    });
    console.log(result, "forEach");
}
