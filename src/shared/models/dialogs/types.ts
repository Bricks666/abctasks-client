import { Action, Atom } from '@reatom/framework';

export interface DialogsModel {
	readonly openedAtom: Atom<string[]>;
	readonly mountedAtom: Atom<string[]>;
	readonly open: Action<[name: string]>;
	readonly close: Action<[name: string]>;
	readonly openSyncly: Action<[name: string]>;
	readonly closeSyncly: Action<[name: string]>;
}

export interface BoundDialogModel {
	readonly openedAtom: Atom<boolean>;
	readonly mountedAtom: Atom<boolean>;
	readonly open: Action<[]>;
	readonly close: Action<[]>;
}
