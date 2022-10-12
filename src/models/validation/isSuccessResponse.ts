import { Validator } from '@farfetched/core/validation/type';
import {
	StandardResponse,
	StandardSuccessResponse,
} from '@/interfaces/response';

export const getIsSuccessResponseValidator = <T>(): Validator<
	StandardResponse<T>,
	unknown,
	void
> => {
	return (data): data is StandardSuccessResponse<T> =>
		data.errorMessage === null;
};
