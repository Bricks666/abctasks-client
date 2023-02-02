import { StandardResponse } from '@/shared/types';

export const dataExtractor = <T>({
	result,
}: {
	result: StandardResponse<T>;
}): T => {
	return result.data;
};
