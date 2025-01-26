import { Autocomplete } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { UserDto } from '@/shared/api';
import { CommonProps, Fn } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useSearchedUsers } from '../../lib';
import { searchUserModel } from '../../models';
import { TemplateUserListItem } from '../template-user-list-item';

export interface UserSearchProps extends CommonProps, FieldProps {
	readonly onChange?: Fn<[user: UserDto | null], unknown>;
	readonly value?: UserDto | null;
}

export const UserSearch: React.FC<UserSearchProps> = (props) => {
	const { className, onChange, value, ...rest } = props;
	const users = useSearchedUsers();
	const resetUsers = useUnit(searchUserModel.query.reset);
	const searchChanged = useUnit(searchUserModel.searchChanged);

	const handleChange = (_: unknown, user: UserDto | null) => {
		onChange?.(user);
	};

	const onInputChange = (_: unknown, value: string) => {
		if (value === '') {
			resetUsers();

			return;
		}
		searchChanged(value);
	};

	return (
		<Autocomplete
			className={className}
			options={users.data}
			onChange={handleChange}
			value={value}
			getOptionLabel={(option) => option.username}
			onInputChange={onInputChange}
			renderOption={(props, option) => (
				<TemplateUserListItem {...props} {...option} />
			)}
			renderInput={(params) => <Field {...params} {...rest} />}
		/>
	);
};
