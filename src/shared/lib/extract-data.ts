import { StandardResponse } from '@/shared/types';

export const extractData = <T>({
	result,
}: {
	result: StandardResponse<T>;
}): T => {
	return result.data;
};
