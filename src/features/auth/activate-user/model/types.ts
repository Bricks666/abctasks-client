import { Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

export interface ActivateUserModel {
	readonly activatedAtom: Atom<boolean>;
	readonly errorAtom: Atom<string | null>;
	readonly pendingAtom: Atom<boolean>;
}

export const responseSchema = createStandardResponseSchema(zod.boolean());
