import { connectDevtools } from '@reatom/devtools';
import { createCtx, connectLogger } from '@reatom/framework';

import { __DEV__, __TEST__ } from './const';

export const ctx = createCtx();

if (__DEV__ && !__TEST__) {
	connectLogger(ctx);
	connectDevtools(ctx);
}
