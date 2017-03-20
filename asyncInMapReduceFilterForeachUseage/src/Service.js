export default class Servcie {
    async getDataFromIndex(data) {
        return new Promise((resolve, reject) => {
            resolve(data * 10)
        });
    }
}
