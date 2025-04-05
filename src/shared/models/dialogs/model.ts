import { action, atom, noop, onConnect, sleep } from '@reatom/framework';
import { withSearchParamsPersist } from '@reatom/url';
import { molecule } from 'bunshi';

import { constructName } from '@/shared/lib';

import type { DialogsModel } from './types';

const modelName = 'dialogs';
const searchParamKey = 'p';

export const DialogsMolecule = molecule((): DialogsModel => {
	const openedSynclyAtom = atom<string[]>(
		[],
		constructName(modelName, 'openedSynclyAtom')
	).pipe(
		withSearchParamsPersist(searchParamKey, {
			parse: (value = '') => {
				return value.split(',').filter(Boolean);
			},
			serialize: (value) => {
				if (!value) {
					return '';
				}

				return value.join(',');
			},
		})
	);
	const openedManuallyAtom = atom<string[]>(
		[],
		constructName(modelName, 'openedManualAtom')
	);
	const openedAtom = atom<string[]>(
		(ctx) => {
			return ctx.spy(openedSynclyAtom).concat(ctx.spy(openedManuallyAtom));
		},
		constructName(modelName, 'openedAtom')
	);
	const mountedAtom = atom<string[]>(
		[],
		constructName(modelName, 'mountedAtom')
	);

	const open = action(
		(ctx, name: string) => {
			openedManuallyAtom(ctx, (dialogs) => dialogs.concat(name));
		},
		constructName(modelName, 'open')
	);
	const close = action(
		(ctx, name: string) => {
			openedManuallyAtom(ctx, (dialogs) =>
				dialogs.filter((dialog) => dialog !== name)
			);
		},
		constructName(modelName, 'close')
	);

	const openSyncly = action(
		(ctx, name: string) => {
			openedSynclyAtom(ctx, (dialogs) => dialogs.concat(name));
		},
		constructName(modelName, 'openSyncly')
	);
	const closeSyncly = action(
		(ctx, name: string) => {
			openedSynclyAtom(ctx, (dialogs) =>
				dialogs.filter((dialog) => dialog !== name)
			);
		},
		constructName(modelName, 'closeSyncly')
	);

	openedAtom.onChange(async (ctx, dialogs) => {
		await ctx.schedule(() => sleep(250));
		mountedAtom(ctx, dialogs);
	});

	onConnect(mountedAtom, (ctx) => ctx.subscribe(openedAtom, noop));

	return {
		openedAtom,
		mountedAtom,
		open,
		close,
		openSyncly,
		closeSyncly,
	};
});
