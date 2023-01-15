import { useUnit } from 'effector-react';
import { searchUserModel } from '../model';

export const useSearchedUsers = () => {
	return useUnit(searchUserModel.query);
};
