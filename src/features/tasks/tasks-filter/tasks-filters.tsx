import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { TagPicker } from '@/entities/tags';
import { UsersInRoomPicker } from '@/entities/users';

import { usePreventDefault, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover } from '@/shared/ui';

import { form } from './model';
import styles from './tasks-filters.module.css';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;

	const [open, { toggleOn, toggleOff, }] = useToggle();
	const reset = useUnit(form.reset);
	const submit = useUnit(form.submit);

	const onSubmit = usePreventDefault(() => {
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
					<Tags />
					<Users />
					<After />
					<Before />
					<Button onClick={onReset} type='reset' variant='text' color='primary'>
						Сбросить
					</Button>
					<Button type='submit' variant='contained' color='primary'>
						Применить
					</Button>
				</form>
			}
		/>
	);
};

const Tags: React.FC = () => {
	const tagIds = useUnit(form.fields.tagIds);

	return (
		<TagPicker
			value={tagIds.value}
			onChange={tagIds.onChange}
			onBlur={tagIds.onBlur}
			helperText={tagIds.errorText}
			isValid={tagIds.isValid}
			name='tagIds'
			label='Группы'
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const Users: React.FC = () => {
	const authorIds = useUnit(form.fields.authorIds);

	return (
		<UsersInRoomPicker
			value={authorIds.value}
			onChange={authorIds.onChange}
			onBlur={authorIds.onBlur}
			helperText={authorIds.errorText}
			isValid={authorIds.isValid}
			name='authorIds'
			label='Авторы'
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const After: React.FC = () => {
	const after = useUnit(form.fields.after);

	return (
		<DatePicker
			value={after.value}
			onChange={after.onChange}
			label='Создано после'
			size='medium'
		/>
	);
};

const Before: React.FC = () => {
	const before = useUnit(form.fields.before);

	return (
		<DatePicker
			value={before.value}
			onChange={before.onChange}
			label='Создано до'
			size='medium'
		/>
	);
};
