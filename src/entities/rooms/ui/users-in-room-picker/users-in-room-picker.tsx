import { Autocomplete, TextField } from '@mui/material';
import * as React from 'react';
import { User } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { useUsersInRoom } from '../../lib';

export interface UsersInRoomPickerProps extends CommonProps {
	readonly onChange: (value: User | null) => void;
	readonly value: User | null;
	readonly error?: boolean;
	readonly helperText?: string;
	readonly label?: string;
}

export const UsersInRoomPicker: React.FC<UsersInRoomPickerProps> = React.memo(
	(props) => {
		const { onChange, value, className, error, label, helperText, } = props;
		const users = useUsersInRoom();

		const changeHandler = (evt: unknown, value: User | null) => {
			onChange(value);
		};

		return (
			<Autocomplete
				className={className}
				options={users.data}
				value={value}
				getOptionLabel={(user) => user.login}
				loading={users.pending}
				onChange={changeHandler}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							error={error}
							label={label}
							helperText={helperText}
						/>
					);
				}}
			/>
		);
	}
);
