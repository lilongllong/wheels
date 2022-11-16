import moment from 'moment';
export const randomString = () => Buffer.from(new Date().toISOString()).toString('base64');


export const formatTime = (value: Date) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
};
