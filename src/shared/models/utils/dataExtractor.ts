import { StandardSuccessResponse } from '@/types';

export const dataExtractor = <T>({
	result,
}: {
	result: StandardSuccessResponse<T>;
}): T => {
	return result.data;
};
