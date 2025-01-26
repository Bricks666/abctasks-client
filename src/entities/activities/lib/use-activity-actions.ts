import { useAtom } from '@reatom/npm-react';
import { useMemo } from 'react';

import { ActivityActions, activityActionsModel } from '../models';

export interface UseActivityActionsResult {
	readonly data: ActivityActions;
	readonly pending: boolean;
}

export const useActivityActions = (): UseActivityActionsResult => {
	const model = useMemo(activityActionsModel.create, []);

	const [data] = useAtom(model.actionsAtom);
	const [pending] = useAtom(model.pendingAtom);

	return { data, pending, };
};
