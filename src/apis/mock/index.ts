import GlobalFetch from 'alova/GlobalFetch';
import { type MockWrapper, createAlovaMockAdapter } from '@alova/mock';

const modules = import.meta.glob<MockWrapper>('./*.ts', {
  eager: true,
  import: 'default'
});

const mocks = Object.values(modules).map(module => module);
const mockAdepter = createAlovaMockAdapter(mocks, {
  // mock接口响应延迟，单位毫秒
  delay: 1000,
  // 是否打印mock接口请求信息
  mockRequestLogger: true,
  matchMode: 'methodurl',
  httpAdapter: GlobalFetch()
});

export default mockAdepter;
