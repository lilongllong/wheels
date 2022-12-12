import axios from 'axios';
import apis, { baseUrl } from './api';

export abstract class HouseDataBaseClass {
    abstract star(): boolean; // 房屋数据关注，每次展示优先展示
    abstract unstar(): boolean; // 取消关注
    async fetchInfo(name: string): Promise<any | undefined> {
        const res = await axios.request({
            method: apis.fetchHouseInfo.method,
            baseURL: baseUrl,
            url: apis.fetchHouseInfo.url,
            params: {
                name,
            }
        });
        if (res.status === 200 && res.data?.code === 0) {
            return res.data.data;
        }
        return undefined;
    }
}
