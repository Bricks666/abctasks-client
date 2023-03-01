import { Autocomplete } from '@mui/material';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useUsersInRoom } from '../../lib';
import { TemplateUserListItem } from '../template-user-list-item';

export interface UsersInRoomPickerProps extends CommonProps, FieldProps {
	readonly onChange: (value: number[]) => void;
	readonly value: number[];
}

export const UsersInRoomPicker: React.FC<UsersInRoomPickerProps> = React.memo(
	(props) => {
		const { onChange, value, className, ...rest } = props;
		const users = useUsersInRoom();

		const changeHandler = (_: unknown, users: User[]) => {
			onChange(users.map((user) => user.id));
		};

		const selected = users.data.filter((user) => value.includes(user.id));

		return (
			<Autocomplete
				className={className}
				options={users.data}
				value={selected}
				getOptionLabel={(user) => user.login}
				loading={users.pending}
				onChange={changeHandler}
				renderOption={(params, option) => (
					<TemplateUserListItem {...params} {...option} />
				)}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				multiple
			/>
		);
	}
);
