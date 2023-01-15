import { Autocomplete } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useSearchedUsers } from '../../lib';
import { searchUserModel } from '../../model';
import { TemplateUserCard } from '../template-user-card';

export interface UserSearchProps extends CommonProps, FieldProps {
	readonly onChange?: (user: User | null) => unknown;
	readonly value?: User | null;
}

export const UserSearch: React.FC<UserSearchProps> = (props) => {
	const { className, onChange, value, ...rest } = props;
	const users = useSearchedUsers();
	const reset = useUnit(searchUserModel.query.reset);
	const searchChanged = useUnit(searchUserModel.searchChanged);

	const handleChange = (evt: unknown, user: User | null) => {
		onChange?.(user);
	};

	return (
		<Autocomplete
			className={className}
			options={users.data}
			onChange={handleChange}
			value={value}
			getOptionLabel={(option) => option.login}
			onInputChange={(evt: unknown, value: string) => {
				searchChanged(value);
			}}
			onClose={reset}
			renderOption={(props, option) => (
				<TemplateUserCard {...props} {...option} />
			)}
			renderInput={(params) => <Field {...params} {...rest} />}
		/>
	);
};
