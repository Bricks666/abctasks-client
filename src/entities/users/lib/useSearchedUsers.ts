import { useUnit } from 'effector-react';

import { searchUserModel } from '../models';

export const useSearchedUsers = () => {
	return useUnit(searchUserModel.query);
};
