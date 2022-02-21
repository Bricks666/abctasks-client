export const prepareFullPath = (baseURL: string, url: string): string => {
	return baseURL.endsWith("/") || url.startsWith("/")
		? baseURL + url
		: baseURL + "/" + url;
};
