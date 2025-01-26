import { AtomMut } from '@reatom/framework';

import { Fn } from '@/shared/types';

export type Page = number;
export type OnPageChanged = Fn<[{ readonly page: Page }], void>;

export interface CreateActivitiesPaginationModelParams {
	readonly name: string;
	readonly onPageChanged: OnPageChanged;
}

export interface ActivitiesPaginationModel {
	readonly pageAtom: AtomMut<number>;
}
