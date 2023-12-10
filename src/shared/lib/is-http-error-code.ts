import { HTTPError } from 'ky';

export const isHttpError = (error: Error): error is HTTPError => {
	return 'request' in error;
};

export const isHttpErrorCode = (error: any, code: number): boolean => {
	return isHttpError(error) && error.response.status === code;
};
