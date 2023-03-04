import { Autocomplete } from '@mui/material';
import * as React from 'react';
import { User } from '@/shared/api';
import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useUsersInRoom } from '../../lib';
import { TemplateUserListItem } from '../template-user-list-item';

export type UsersInRoomPickerProps = CommonProps &
	PickerProps<number> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const UsersInRoomPicker: React.FC<UsersInRoomPickerProps> = React.memo(
	(props) => {
		const { onChange, value, className, multiple, limitTags, ...rest } = props;
		const users = useUsersInRoom();

		const changeHandler = preparePickerHandler<User, 'id', number>(
			{ multiple, onChange, },
			'id'
		);

		const selected = preparePickerSelectedValue(
			{ value, multiple, },
			users.data,
			'id'
		);

		return (
			<Autocomplete
				className={className}
				options={users.data}
				value={selected as any}
				onChange={changeHandler as any}
				getOptionLabel={(user) => user.username}
				loading={users.pending}
				renderOption={(params, option) => (
					<TemplateUserListItem {...params} {...option} />
				)}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				limitTags={limitTags}
				multiple={multiple}
			/>
		);
	}
);
