import { Validator } from '@farfetched/core';
import { StandardResponse, StandardSuccessResponse } from '@/shared/types';

export const getIsSuccessResponseValidator = <T>(): Validator<
	StandardResponse<T>,
	unknown,
	void
> => {
	return (
		data
	): data is { result: StandardSuccessResponse<T>; params: unknown } =>
		data.result.errorMessage === null;
};
