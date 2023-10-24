import { createAlova, Method } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
import mockAdepter from './mock';
import { isDev } from '../utils/env';

const baseURL = import.meta.env.VITE_API_URL;
const requestAdapter = isDev() ? mockAdepter : GlobalFetch();

const baseConfig = {
  baseURL,
  statesHook: VueHook,
  requestAdapter,
  timeout: 5000,
  async beforeRequest(method: Method) {
    method.config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  }
};

const alovaInstance = createAlova({
  ...baseConfig,
  async responded(response) {
    if (response.status >= 400) {
      //   message.error(response.statusText);
      throw new Error(response.statusText);
    }
    try {
      const res = await response.json();
      const { code, data, msg } = res;
      if (code === 200) {
        return data;
      }
      throw new Error(msg);
    } catch (e: any) {
      //   message.error(e.message);
      throw new Error(e.message);
    }
  }
});

export default alovaInstance;
