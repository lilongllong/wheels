import { randomString, formatTime } from "../../src/utils/string";

describe('string test', () => {
  test('随机字符串测试', () => {
    const result = randomString();
    expect(typeof result).toEqual('string');
  });
  test('测试当前时间', () => {
    const str = '2022-11-22 00:00:00';
    const result = formatTime(new Date(str));
    expect(result).toEqual(str);
  });
});

describe('string2 test', () => {
  test('随机字符串测试', () => {
    const result = randomString();
    expect(typeof result).toEqual('string');
  });
  test('测试当前时间', () => {
    const str = '2022-11-22 00:00:00';
    const result = formatTime(new Date(str));
    expect(result).toEqual(str);
  });
});
