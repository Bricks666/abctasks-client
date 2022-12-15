import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { groupsModel } from '@/entities/groups';
import { RemoveGroupRequest, groupsApi } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeGroupDomain = createDomain();

export const removeGroupFx = removeGroupDomain.effect<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeGroupFx');

removeGroupFx.use(groupsApi.remove);

export const removeGroupMutation = createMutationWithAccess<
	RemoveGroupRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: removeGroupMutation.finished.success,
	source: groupsModel.getGroupsQuery.$data,
	filter: (_, { result, }) => globalThis.Boolean(result.data),
	fn: (groups, { params, }) => {
		return groups.filter((group) => group.id !== params.id);
	},
	target: [groupsModel.getGroupsQuery.$data, groupsModel.invalidateCache],
});
