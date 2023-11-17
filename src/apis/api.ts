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
  },
  fetchHouseInfo: {
    method: 'GET',
    url: '/xingzhoushenfang/house_info/get'
  },
  downloadPagePdf: {
    method: 'POST',
    url: '/page/pdf'
  },
  downloadPageImage: {
    method: 'POST',
    url: '/page/screenshot'
  },
  PagePDFLink: {
    method: 'GET',
    url: '/page/pdf_link'
  },
  PageImageLink: {
    method: 'GET',
    url: '/page/screenshot_link'
  },
  upload: {
    method: 'POST',
    url: '/minio/upload'
  },
  download: {
    method: 'GET',
    url: '/minio/download'
  },
}
