import { Autocomplete } from '@mui/material';
import {
	type ComponentType,
	type FC,
	type HTMLAttributes,
	type SyntheticEvent,
	memo
} from 'react';

import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import type { CommonProps, Fn, PickerProps } from '@/shared/types';
import { Field, type FieldProps } from '@/shared/ui';

import type { User, UserId, Users } from '../../models';
import { TemplateUserListItem } from '../template-user-list-item';

export type UsersPickerProps = CommonProps &
	PickerProps<UserId> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly users: Users;
		readonly loading?: boolean;
		readonly onInputChange?: Fn<[event: SyntheticEvent, value: string], void>;
		/**
		 * @default {@link TemplateUserListItem}
		 */
		readonly UserListItem?: ComponentType<HTMLAttributes<HTMLLIElement> & User>;
	};

export const UsersPicker: FC<UsersPickerProps> = memo((props) => {
	const {
		onChange,
		value,
		className,
		multiple,
		limitTags,
		users,
		onInputChange,
		loading,
		UserListItem = TemplateUserListItem,
		...rest
	} = props;

	const handleChange = preparePickerHandler(
		{
			onChange,
			multiple,
		},
		'id'
	);
	const selected = preparePickerSelectedValue(
		{
			value,
			multiple,
		},
		users,
		'id'
	);

	return (
		<Autocomplete
			className={className}
			options={users}
			value={selected}
			onChange={handleChange}
			getOptionLabel={(member) => member.username}
			loading={loading}
			onInputChange={onInputChange}
			renderOption={(params, option) => (
				<UserListItem {...params} {...option} />
			)}
			renderInput={(params) => {
				return <Field {...params} {...rest} />;
			}}
			limitTags={limitTags}
			multiple={multiple}
		/>
	);
});
