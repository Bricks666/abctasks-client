import { useUnit } from 'effector-react';
import { searchedUsersModel } from '../model';

export const useSearchedUsers = () => {
	return useUnit(searchedUsersModel.query);
};
