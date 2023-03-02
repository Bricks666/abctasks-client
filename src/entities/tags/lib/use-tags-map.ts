import { useUnit } from 'effector-react';
import { tagsModel } from '../model';
import { useTags } from './use-tags';

export const useTagsMap = () => {
	const query = useTags();
	const data = useUnit(tagsModel.$tagsMap);
	return {
		...query,
		data,
	};
};
