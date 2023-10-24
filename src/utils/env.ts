const { DEV, PROD } = import.meta.env;

const isDev = () => DEV;
const isNotDev = () => !DEV;

const isProd = () => PROD;
const isNotProd = () => !PROD;

export { isDev, isNotDev, isProd, isNotProd };
