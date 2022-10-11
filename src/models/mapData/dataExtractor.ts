import { StandardSuccessResponse } from '@/interfaces/response/standardResponse';

export type CallbackOneArgs<Arg1, Result> = (args1: Arg1) => Result;

export const getDataExtractor = <T>(): CallbackOneArgs<
	StandardSuccessResponse<T>,
	T
> => {
	return (response) => response.data;
};
