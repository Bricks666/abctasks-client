import { AtomMut, Reaction } from '@reatom/framework';

import { Fn } from '@/shared/types';

export type Page = number;
export type OnPageChanged = Fn<[{ readonly page: Page }], void>;

export interface ActivitiesPaginationModel {
	readonly pageAtom: AtomMut<number>;
	readonly onPageChanged: Reaction<[onChange: OnPageChanged], void>;
}
