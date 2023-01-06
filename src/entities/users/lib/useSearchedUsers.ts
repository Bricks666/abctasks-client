import { useQuery } from '@farfetched/react';
import { searchedUsersModel } from '../model';

export const useSearchedUsers = () => {
	return useQuery(searchedUsersModel.query);
};
