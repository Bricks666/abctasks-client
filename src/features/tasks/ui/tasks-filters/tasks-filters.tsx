import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { GroupsSelect } from '@/entities/groups';
import { UsersInRoomPicker } from '@/entities/rooms';
import { CommonProps } from '@/shared/types';
import { DatePicker } from '@/shared/ui';
import { tasksFiltersModel } from '../../model';

import styles from './tasks-filters.module.css';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;

	const { fields, reset, } = useForm(tasksFiltersModel.form);
	const { after, authorId, before, groupId, } = fields;

	return (
		<form className={cn(styles.wrapper, className)}>
			<GroupsSelect
				value={groupId.value}
				onChange={groupId.onChange}
				onBlur={groupId.onBlur}
				errorText={groupId.errorText()}
				isValid={groupId.isValid}
				name={groupId.name}
				label='Group'
				emptyOptionText='All'
				hasEmptyOption
			/>
			<UsersInRoomPicker
				value={authorId.value}
				onChange={authorId.onChange}
				onBlur={authorId.onBlur}
				errorText={authorId.errorText()}
				isValid={authorId.isValid}
				name={authorId.name}
				label='User'
			/>
			<DatePicker value={after.value} onChange={after.onChange} label='After' />
			<DatePicker
				value={before.value}
				onChange={before.onChange}
				label='Before'
			/>
			<Button
				className={styles.button}
				onClick={reset as any}
				type='reset'
				variant='outlined'
				color='primary'>
				Reset
			</Button>
		</form>
	);
};
