import { Validator } from '@farfetched/core/validation/type';
import { StandardResponse } from '@/interfaces/response/standardResponse';

export const getIsSuccessResponseValidator = <T>(): Validator<
	StandardResponse<T>,
	unknown,
	void
> => {
	return (data) => data.errorMessage === null;
};
