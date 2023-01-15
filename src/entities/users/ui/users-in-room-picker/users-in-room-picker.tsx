import { Autocomplete } from '@mui/material';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useUsersInRoom } from '../../lib';
import { TemplateUserCard } from '../template-user-card';

export interface UsersInRoomPickerProps extends CommonProps, FieldProps {
	readonly onChange: (value: number | null) => void;
	readonly value: number | null;
}

export const UsersInRoomPicker: React.FC<UsersInRoomPickerProps> = React.memo(
	(props) => {
		const { onChange, value, className, ...rest } = props;
		const users = useUsersInRoom();

		const changeHandler = (evt: unknown, value: User | null) => {
			onChange(value?.id ?? null);
		};

		const user = users.data.find((user) => user.id === Number(value)) ?? null;

		return (
			<Autocomplete
				className={className}
				options={users.data}
				value={user}
				getOptionLabel={(user) => user.login}
				loading={users.pending}
				onChange={changeHandler}
				renderOption={(params, option) => (
					<TemplateUserCard {...params} {...option} />
				)}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
			/>
		);
	}
);
