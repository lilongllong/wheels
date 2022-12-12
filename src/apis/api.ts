export const baseUrl = 'http://127.0.0.1:3000/api';

export default {
  district_api: {
    method: 'GET',
    url: '/xingzhoushenfang/sunpan/get',
  },
  community_api: {
    method: 'GET',
    url: '/xingzhoushenfang/community/get',
  },
  district_name_api: {
    method: 'GET',
    url: '/xingzhoushenfang/district/get'
  },
  filter_sales_api: {
    method: 'POST',
    url: '/xingzhoushenfang/sales/filter',
  }
}
