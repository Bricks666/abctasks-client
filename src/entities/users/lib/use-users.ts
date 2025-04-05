import { useMemo } from 'react';

import { UsersModel, usersModel } from '../models';

// @todo rename to useUsersSearch
// @todo Move to features layer
export const useUsers = (): UsersModel => {
	return useMemo(usersModel.Molecule, []);
};
