import fetchApi from '../../service';

const getHouseList = () => {
  return fetchApi('get', '/xingzhoushenfang/sunpan/get', {name: '万象新天'});
}

export {
  getHouseList
}
