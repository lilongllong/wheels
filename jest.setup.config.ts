import '@testing-library/jest-dom/extend-expect';

require('babel-plugin-require-context-hook/register')();

class LocalStorageMock {
  store: Record<string, any> = {};

  length = 0;

  key = (index: number) => String(index);

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(global, 'localStorage', {
  value: new LocalStorageMock(),
});

Object.defineProperty(global, '__webpack_public_path__', {
  value: 'webpackPublicPath',
  writable: true,
  configurable: true,
});
