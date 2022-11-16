import { randomString } from "../../src/utils/string";

describe('string test', () => {
  test('随机字符串测试', () => {
    const result = randomString();
    expect(typeof result).toEqual('string');
  });
});
