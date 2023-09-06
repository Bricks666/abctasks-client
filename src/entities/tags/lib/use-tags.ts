import { useUnit } from 'effector-react';

import { tagsModel } from '../model';

export const useTags = () => {
	const query = useUnit(tagsModel.query);
	const status = useUnit(tagsModel.query.$status);
	return {
		...query,
		status,
	};
};
