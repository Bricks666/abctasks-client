import { Ctx } from '@reatom/framework';

import { StandardResponse } from '@/shared/types';

export const extractData = <T>({
	result,
}: {
	result: StandardResponse<T>;
}): T => {
	return result.data;
};

export const mapStandardResponse = <T>(
	_ctx: Ctx,
	data: StandardResponse<T>
): T => {
	return data.data;
};
