export const randomString = () => Buffer.from(new Date().toISOString()).toString('base64');
