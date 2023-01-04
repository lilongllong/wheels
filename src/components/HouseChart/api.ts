import fetchApi from '../../service';

const getHouseList = (name: string) => {
  return fetchApi('get', '/xingzhoushenfang/sunpan/get', {name: name});
}

export {
  getHouseList
}
