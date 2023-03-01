import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { GroupsSelect } from '@/entities/groups';
import { UsersInRoomPicker } from '@/entities/users';
import { useSubmit, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover } from '@/shared/ui';
import { tasksFiltersModel } from '../../model';

import styles from './tasks-filters.module.css';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;

	const [open, { toggleOn, toggleOff, }] = useToggle();
	const { fields, reset, submit, } = useForm(tasksFiltersModel.form);
	const { after, authorIds, before, tagIds: groupId, } = fields;

	const onSubmit = useSubmit(() => {
		submit();
		toggleOff();
	});

	const onReset = () => {
		reset();
		toggleOff();
	};

	return (
		<FiltersPopover
			title='Фильтры задач'
			open={open}
			onClose={toggleOff}
			onOpen={toggleOn}
			filters={
				<form className={cn(styles.wrapper, className)} onSubmit={onSubmit}>
					<GroupsSelect
						value={groupId.value}
						onChange={groupId.onChange}
						onBlur={groupId.onBlur}
						helperText={groupId.errorText()}
						isValid={groupId.isValid}
						name={groupId.name}
						label='Group'
						emptyOptionText='All'
						size='medium'
						hasEmptyOption
					/>
					<UsersInRoomPicker
						value={authorIds.value}
						onChange={authorIds.onChange}
						onBlur={authorIds.onBlur}
						helperText={authorIds.errorText()}
						isValid={authorIds.isValid}
						name={authorIds.name}
						label='User'
						size='medium'
					/>
					<DatePicker
						value={after.value}
						onChange={after.onChange}
						label='After'
						size='medium'
					/>
					<DatePicker
						value={before.value}
						onChange={before.onChange}
						label='Before'
						size='medium'
					/>
					<Button
						onClick={onReset}
						type='reset'
						variant='outlined'
						color='primary'>
						Reset
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						Apply
					</Button>
				</form>
			}
		/>
	);
};
