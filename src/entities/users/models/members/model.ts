import {
	mapState,
	onDisconnect,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';

import { membersApi } from '@/shared/api';
import {
	constructName,
	createSingletonFactory,
	mapStandardResponse,
	retryQuery
} from '@/shared/lib';

import { CreateMembersModelParams, MembersModel, Users } from './types';

const modelName = 'users';

const storage = createMemStorage({
	name: modelName,
});
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const create = createSingletonFactory(
	(params: CreateMembersModelParams): MembersModel => {
		const { roomId, } = params;

		const getMembers = reatomResource(async (ctx) => {
			return ctx.schedule(() => {
				return membersApi.getAll({ roomId, }, ctx.controller.signal);
			});
		}, constructName(modelName, roomId.toString(), 'getMembers')).pipe(
			withDataAtom([] as Users, mapStandardResponse),
			withCache({ withPersist, }),
			withRetry(),
			withErrorAtom((_ctx, error) => error as Error, { initState: null, })
		);

		retryQuery({
			query: getMembers,
			store: getMembers.dataAtom,
			timeout: 5000,
		});

		return {
			errorAtom: getMembers.errorAtom,
			membersAtom: getMembers.dataAtom,
			pendingAtom: getMembers.pendingAtom.pipe(
				mapState((_ctx, state) => !!state)
			),
			retry: getMembers.retry,
		};
	},
	{
		key: (params) => constructName(modelName, params.roomId.toString()),
		hooks: {
			staleOn: (result, staleOn) => onDisconnect(result.membersAtom, staleOn),
		},
	}
);
