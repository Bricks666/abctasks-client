import { sample } from 'effector';
import { debounce, debug } from 'patronum';
import { addUserRoomModel } from '@/features/rooms';
import { searchUserModel } from '@/features/users';
import { createPopupControlModel } from '@/entities/popups';
import { searchedUsersModel } from '@/entities/users';
import { popupsMap } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.addUser);

const { $values, reset, } = searchUserModel.form;

sample({
	clock: addUserRoomModel.mutation.finished.success,
	target: close,
});

sample({
	clock: close,
	target: [searchedUsersModel.query.reset, reset],
});

debug(searchUserModel.form.$values, searchedUsersModel.query.$data);

const debouncedSearch = sample({
	clock: debounce({
		timeout: 150,
		source: $values,
	}),
	filter: $isOpen,
});

sample({
	clock: debouncedSearch,
	target: searchedUsersModel.query.start,
});
