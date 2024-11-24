import { HTTPError } from 'ky';

export const isHttpError = (error: any): error is HTTPError => {
	return !!error && 'request' in error;
};

export const isHttpErrorCode = (error: any, code: number): boolean => {
	return isHttpError(error) && error.response.status === code;
};
