// eslint-disable-next-line import/no-mutable-exports
console.log(import.meta.env.VITE_API_HOST);
export const BASE = import.meta.env.VITE_API_HOST;

export const API_HOST = `${BASE}/api`;
