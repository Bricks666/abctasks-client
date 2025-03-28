import {
	mapState,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { createScope, molecule, use } from 'bunshi';

import type { RoomId } from '@/entities/rooms/@x/users';

import { membersApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import { Users } from '../users';

import { MembersModel } from './types';

export const Scope = createScope<RoomId>(-1);

const modelName = 'users';

const storage = createMemStorage({
	name: modelName,
});
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): MembersModel => {
	const roomId = use(Scope);

	const fetchMembers = reatomResource(
		async (ctx) => {
			return ctx.schedule(() => {
				return membersApi.getAll({ roomId, }, ctx.controller.signal);
			});
		},
		constructName(modelName, roomId.toString(), 'fetchMembers')
	).pipe(
		withDataAtom([] as Users, mapStandardResponse),
		withCache({ withPersist, }),
		withRetry(),
		withErrorAtom(undefined, { initState: null, })
	);

	retryQuery({
		query: fetchMembers,
		store: fetchMembers.dataAtom,
		timeout: 5000,
	});

	return {
		errorAtom: fetchMembers.errorAtom,
		membersAtom: fetchMembers.dataAtom,
		pendingAtom: fetchMembers.pendingAtom.pipe(
			mapState((_ctx, state) => !!state)
		),
		retry: fetchMembers.retry,
	};
});
