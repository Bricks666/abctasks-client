import TuneIcon from '@mui/icons-material/Tune';
import { Button, IconButton, Popover, Tooltip } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { GroupsSelect } from '@/entities/groups';
import { UsersInRoomPicker } from '@/entities/users';
import { useSubmit, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker } from '@/shared/ui';
import { tasksFiltersModel } from '../../model';

import styles from './tasks-filters.module.css';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;

	const [open, { toggle, toggleOff, }] = useToggle();
	const [ref, setRef] = React.useState<HTMLElement | null>(null);
	const { fields, reset, submit, } = useForm(tasksFiltersModel.form);
	const { after, authorId, before, groupId, } = fields;

	const onSubmit = useSubmit(() => {
		submit();
		toggleOff();
	});

	const onReset = () => {
		reset();
		toggleOff();
	};

	return (
		<>
			<Tooltip title='Фильтры задач'>
				<IconButton onClick={toggle} ref={setRef}>
					<TuneIcon />
				</IconButton>
			</Tooltip>
			<Popover
				open={open}
				onClose={toggleOff}
				anchorEl={ref}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top',
				}}>
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
						value={authorId.value}
						onChange={authorId.onChange}
						onBlur={authorId.onBlur}
						helperText={authorId.errorText()}
						isValid={authorId.isValid}
						name={authorId.name}
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
			</Popover>
		</>
	);
};
