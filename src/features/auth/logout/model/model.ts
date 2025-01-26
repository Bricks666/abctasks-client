import { reatomAsync } from '@reatom/framework';

import { authApi } from '@/shared/api';

// @todo Add clear of sessionModel
export const logout = reatomAsync(async () => {
	return authApi.logout();
}, 'logout');
