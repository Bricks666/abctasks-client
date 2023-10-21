import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TagPicker } from '@/entities/tags';
import { UsersInRoomPicker } from '@/entities/users';

import { usePreventDefault, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover, Show } from '@/shared/ui';

import { form } from './model';
import styles from './tasks-filters.module.css';

export interface TasksFiltersProps extends CommonProps {}

export const TasksFilters: React.FC<TasksFiltersProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('tasks');

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

	const buttonsText = t('actions.tasks_filters.actions', {
		returnObjects: true,
	}) as Record<string, string>;
	const title = t('actions.tasks_filters.title');

	const buttons = (
		<>
			<Button onClick={onReset} type='reset' variant='text' color='primary'>
				{buttonsText.reset}
			</Button>
			<Button
				onClick={onSubmit}
				type='submit'
				variant='contained'
				color='primary'>
				{buttonsText.submit}
			</Button>
		</>
	);

	return (
		<FiltersPopover
			title={title}
			open={open}
			onClose={toggleOff}
			onOpen={toggleOn}
			icon={<TuneIcon />}
			slots={{ actions: buttons, }}>
			{({ isPopup, }) => (
				<form className={cn(styles.wrapper, className)} onSubmit={onSubmit}>
					<Tags />
					<Users />
					<After />
					<Before />
					<Show show={!isPopup}>{buttons}</Show>
				</form>
			)}
		</FiltersPopover>
	);
};

const Tags: React.FC = () => {
	const { t, } = useTranslation('tasks');

	const tagIds = useUnit(form.fields.tagIds);
	const label = t('actions.tasks_filters.fields.tags');

	return (
		<TagPicker
			value={tagIds.value}
			onChange={tagIds.onChange}
			onBlur={tagIds.onBlur}
			helperText={tagIds.errorText}
			isValid={tagIds.isValid}
			name='tagIds'
			label={label}
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const Users: React.FC = () => {
	const { t, } = useTranslation('tasks');

	const authorIds = useUnit(form.fields.authorIds);

	const label = t('actions.tasks_filters.fields.authors');

	return (
		<UsersInRoomPicker
			value={authorIds.value}
			onChange={authorIds.onChange}
			onBlur={authorIds.onBlur}
			helperText={authorIds.errorText}
			isValid={authorIds.isValid}
			name='authorIds'
			label={label}
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const After: React.FC = () => {
	const { t, } = useTranslation('common');

	const after = useUnit(form.fields.after);

	const label = t('fields.create_after');

	return (
		<DatePicker
			value={after.value}
			onChange={after.onChange}
			onBlur={after.onBlur}
			label={label}
			helperText={after.errorText}
			isValid={after.isValid}
			name='after'
		/>
	);
};

const Before: React.FC = () => {
	const { t, } = useTranslation('common');

	const before = useUnit(form.fields.before);

	const label = t('fields.create_before');

	return (
		<DatePicker
			value={before.value}
			onChange={before.onChange}
			onBlur={before.onBlur}
			label={label}
			helperText={before.errorText}
			isValid={before.isValid}
			name='before'
		/>
	);
};
