import { Autocomplete } from '@mui/material';
import { useAtom } from '@reatom/npm-react';
import * as React from 'react';

import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useMembersModel } from '../../lib';
import { User, Users } from '../../models';
import { TemplateUserListItem } from '../template-user-list-item';

export type MembersPickerProps = CommonProps &
	PickerProps<number> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly roomId: number;
	};

export const MembersPicker: React.FC<MembersPickerProps> = React.memo(
	(props) => {
		const { onChange, value, className, multiple, limitTags, roomId, ...rest } =
			props;
		const membersModel = useMembersModel({ roomId, });
		const [members] = useAtom(membersModel.membersAtom);
		const [pending] = useAtom(membersModel.pendingAtom);

		const changeHandler = preparePickerHandler<User, 'id', number>(
			{ multiple, onChange, },
			'id'
		);

		const selected = preparePickerSelectedValue(
			{ value, multiple, },
			members,
			'id'
		);

		return (
			<Autocomplete
				className={className}
				options={members}
				value={selected as Users}
				onChange={changeHandler as (_: unknown, members: Users) => void}
				getOptionLabel={(member) => member.username}
				loading={pending}
				renderOption={(params, option) => (
					<TemplateUserListItem
						{...params}
						username={option.username}
						photo={option.photo}
						email={option.email}
					/>
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
