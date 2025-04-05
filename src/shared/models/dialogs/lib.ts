import { atom, action } from '@reatom/framework';
import { type Molecule, molecule, use } from 'bunshi';

import { constructName, reconstructName } from '@/shared/lib';

import { DialogsMolecule } from './model';
import type { BoundDialogModel } from './types';

export const bindDialog = (
	name: string,
	syncly = true
): Molecule<BoundDialogModel> => {
	return molecule((): BoundDialogModel => {
		const dialogsModel = use(DialogsMolecule);

		const baseName = reconstructName(
			// eslint-disable-next-line no-underscore-dangle
			dialogsModel.openedAtom.__reatom.name!,
			name
		);

		const openAction = syncly ? dialogsModel.openSyncly : dialogsModel.open;
		const closeAction = syncly ? dialogsModel.closeSyncly : dialogsModel.close;

		const openedAtom = atom(
			(ctx) => {
				return ctx.spy(dialogsModel.openedAtom).includes(name);
			},
			constructName(baseName, 'openedAtom')
		);
		const mountedAtom = atom(
			(ctx) => {
				return ctx.spy(dialogsModel.mountedAtom).includes(name);
			},
			constructName(baseName, 'mountedAtom')
		);
		const open = action(
			(ctx) => openAction(ctx, name),
			constructName(baseName, 'open')
		);
		const close = action(
			(ctx) => closeAction(ctx, name),
			constructName(baseName, 'close')
		);

		return {
			openedAtom,
			mountedAtom,
			open,
			close,
		};
	});
};
