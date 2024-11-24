import { useAtom } from '@reatom/npm-react';

import { ActivityActions, activityActionsModel } from '../models';

export interface UseActivityActionsResult {
	readonly data: ActivityActions;
	readonly pending: boolean;
}

export const useActivityActions = (): UseActivityActionsResult => {
	const model = activityActionsModel.create();

	const [data] = useAtom(model.actionsAtom);
	const [pending] = useAtom(model.pendingAtom);

	return { data, pending, };
};
