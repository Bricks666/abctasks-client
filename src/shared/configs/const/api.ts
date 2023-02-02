// eslint-disable-next-line import/no-mutable-exports
export let base = '';

if (import.meta.env.DEV) {
	base = import.meta.env.VITE_API_HOST;
} else {
	base = process.env.VITE_API_HOST as string;
}
export const api = `${base}/api`;
