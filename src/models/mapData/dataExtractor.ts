import { StandardSuccessResponse } from '@/types';

export const dataExtractor = <T>(response: StandardSuccessResponse<T>): T => {
	return response.data;
};
