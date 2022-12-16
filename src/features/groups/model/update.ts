import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { UpdateGroupRequest, Group, groupsApi, group } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateGroupDomain = createDomain();

export const updateGroupFx = updateGroupDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupFx');
updateGroupFx.use(groupsApi.update);

export const updateGroupMutation = createMutationWithAccess<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: updateGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

sample({
	clock: updateGroupMutation.finished.success,
	source: groupsModel.getGroupsQuery.$data,
	fn: (groups, { result, }) => {
		return groups.map((group) =>
			group.id === result.data.id ? result.data : group
		);
	},
	target: [groupsModel.getGroupsQuery.$data, groupsModel.invalidateCache],
});