import { StandardSuccessResponse } from '@/types/response';

export const dataExtractor = <T>(response: StandardSuccessResponse<T>): T => {
	return response.data;
};
