import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { progressesModel } from '@/entities/progresses';
import { CreateGroupRequest, group, Group, groupsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const createGroupDomain = createDomain();

export const createGroupFx = createGroupDomain.effect<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('createGroupFx');
createGroupFx.use(groupsApi.create);

export const createGroupMutation = createMutationWithAccess<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: createGroupFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

sample({
	clock: createGroupMutation.finished.success,
	source: groupsModel.getGroupsQuery.$data,
	fn: (groups, { result, }) => {
		return [...groups, result.data];
	},
	target: [groupsModel.getGroupsQuery.$data, groupsModel.invalidateCache],
});

sample({
	clock: createGroupMutation.finished.success,
	fn: ({ params, }) => params.roomId,
	target: progressesModel.getProgressQuery.start,
});
