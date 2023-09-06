import { useUnit } from 'effector-react';

import { commentsModel } from '../model';

export const useComments = () => {
	return useUnit(commentsModel.query);
};
