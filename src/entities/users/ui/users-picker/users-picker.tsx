import { Autocomplete } from '@mui/material';
import { Atom } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import {
	ComponentType,
	HTMLAttributes,
	ReactNode,
	SyntheticEvent,
	memo
} from 'react';

import { CommonProps, Fn, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { User } from '../../models';
import { TemplateUserListItem } from '../template-user-list-item';

export type UsersPickerProps<T extends User> = CommonProps &
	PickerProps<T> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly onInputChange: Fn<[event: SyntheticEvent, value: string], void>;
		readonly dataAtom: Atom<T[]>;
		readonly pendingAtom: Atom<boolean>;

		/**
		 * @default {@link TemplateUserListItem}
		 */
		readonly UserListItem?: ComponentType<
			HTMLAttributes<HTMLLIElement> & { readonly user: T }
		>;
	};

export const UsersPicker = memo(
	<T extends User>(props: UsersPickerProps<T>): ReactNode => {
		const {
			onChange,
			value,
			className,
			multiple,
			limitTags,
			dataAtom,
			onInputChange,
			pendingAtom,
			UserListItem = TemplateUserListItem,
			...rest
		} = props;

		const [users] = useAtom(dataAtom);
		const [pending] = useAtom(pendingAtom);

		const handleChange = (event: SyntheticEvent, users: T[] | T | null) => {
			if (multiple) {
				return onChange?.(users as T[]);
			}

			return onChange?.(users as T | null);
		};

		return (
			<Autocomplete
				className={className}
				options={users}
				value={value as T[] | T | null}
				onChange={handleChange as (_: unknown, users: T[]) => void}
				getOptionLabel={(member) => member.username}
				loading={pending}
				onInputChange={onInputChange}
				renderOption={(params, option) => (
					<UserListItem {...params} user={option} />
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
