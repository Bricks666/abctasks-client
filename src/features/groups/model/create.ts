import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { CreateGroupRequest, group, Group, groupsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const createGroupDomain = createDomain();

export const handlerFx = createGroupDomain.effect<
	CreateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('createGroupFx');
handlerFx.use(groupsApi.create);

export const mutation = createMutationWithAccess<
	CreateGroupRequest,
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
		return [...groups, result.data];
	},
	target: [groupsModel.query.$data],
});
