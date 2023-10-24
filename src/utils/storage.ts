import localforage from 'localforage';

localforage.config({
  name: 'EXAMPLE',
  storeName: 'STORE-NAME'
});
export const LOGIN_TOKEN_KEY = 'login-token';

// token相关
const getToken = async () => {
  const token = await localforage.getItem(LOGIN_TOKEN_KEY);
  return token;
};

const setToken = async (token: string) => {
  await localforage.setItem(LOGIN_TOKEN_KEY, token);
};

export { setToken, getToken };
