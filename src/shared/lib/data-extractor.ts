import { StandardResponse, StandardSuccessResponse } from '@/shared/types';

export const dataExtractor = <T>({
	result,
}: {
	result: StandardResponse<T>;
}): T => {
	return (result as StandardSuccessResponse<T>).data;
};
