import { Button } from '@mui/material';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { GroupsSelect } from '@/entities/groups';
import { UsersInRoomPicker } from '@/entities/rooms';
import { CommonProps } from '@/shared/types';
import { DatePicker } from '@/shared/ui';
import { tasksFiltersModel } from '../../model';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;

	const { fields, reset, } = useForm(tasksFiltersModel.form);
	const { after, authorId, before, groupId, } = fields;

	return (
		<form className={className}>
			<GroupsSelect
				value={groupId.value}
				onChange={groupId.onChange}
				onBlur={groupId.onBlur}
				errorText={groupId.errorText()}
				isValid={groupId.isValid}
				name={groupId.name}
			/>
			<UsersInRoomPicker
				value={authorId.value}
				onChange={authorId.onChange}
				onBlur={authorId.onBlur}
				errorText={authorId.errorText()}
				isValid={authorId.isValid}
				name={authorId.name}
			/>
			<DatePicker value={after.value} onChange={after.onChange} />
			<DatePicker value={before.value} onChange={before.onChange} />
			<Button
				onClick={reset as any}
				type='reset'
				variant='outlined'
				color='primary'>
				Reset
			</Button>
		</form>
	);
};
