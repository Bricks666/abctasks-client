import { useAtom } from '@reatom/npm-react';

import { ActivitySpheres, activitySpheresModel } from '../models';

export interface UseActivitySpheresResult {
	readonly data: ActivitySpheres;
	readonly pending: boolean;
}

export const useActivitySpheres = (): UseActivitySpheresResult => {
	const model = activitySpheresModel.create();

	const [data] = useAtom(model.spheresAtom);
	const [pending] = useAtom(model.pendingAtom);

	return { data, pending, };
};
