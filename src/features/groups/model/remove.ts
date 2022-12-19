import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { groupsModel } from '@/entities/groups';
import { RemoveGroupRequest, groupsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeGroupDomain = createDomain();

export const handlerFx = removeGroupDomain.effect<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeGroupFx');

handlerFx.use(groupsApi.remove);

export const mutation = createMutationWithAccess<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: mutation.finished.success,
	source: groupsModel.query.$data,
	filter: (_, { result, }) => globalThis.Boolean(result.data),
	fn: (groups, { params, }) => {
		return groups.filter((group) => group.id !== params.id);
	},
	target: [groupsModel.query.$data],
});
