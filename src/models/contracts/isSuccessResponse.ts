import { Contract } from '@farfetched/core';
import {
	StandardResponse,
	StandardSuccessResponse,
} from '@/interfaces/response/standardResponse';

export const getIsSuccessResponseContract = <T>(): Contract<
	StandardResponse<T>,
	StandardSuccessResponse<T>
> => {
	return {
		isData: (prepared): prepared is StandardSuccessResponse<any> =>
			prepared.errorMessage === null,
		getErrorMessages: (prepared) => {
			return [prepared.errorMessage || 'Something went wrong'];
		},
	};
};
