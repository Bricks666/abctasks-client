export const mockServerResponse = <T>(response: T, timeout: number) => {
	return new Promise<T>((resolve) => {
		setTimeout(() => resolve(response), timeout);
	});
};
