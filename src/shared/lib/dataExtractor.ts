import { StandardSuccessResponse } from '@/shared/types';

export const dataExtractor = <T>({
	result,
}: {
	result: StandardSuccessResponse<T>;
}): T => {
	return result.data;
};
