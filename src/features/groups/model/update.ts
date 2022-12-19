import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { UpdateGroupRequest, Group, groupsApi, group } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateGroupDomain = createDomain();

export const handlerFx = updateGroupDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupFx');
handlerFx.use(groupsApi.update);

export const mutation = createMutationWithAccess<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
});

sample({
	clock: mutation.finished.success,
	source: groupsModel.query.$data,
	fn: (groups, { result, }) => {
		return groups.map((group) =>
			group.id === result.data.id ? result.data : group
		);
	},
	target: [groupsModel.query.$data],
});
