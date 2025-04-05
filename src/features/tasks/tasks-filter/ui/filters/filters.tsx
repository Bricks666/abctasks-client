import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { TagPicker, useTags } from '@/entities/tags';
import { UsersPicker, useMembers } from '@/entities/users';

import { usePreventDefault, useToggle, withProvider } from '@/shared/lib';
import type { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover, Show } from '@/shared/ui';

import { TasksFiltersScopeProvider, useTasksFilters } from '../../lib';
import type { OnFiltersChanged } from '../../model';

import styles from './styles.module.css';

export interface TasksFiltersProps extends CommonProps {
	readonly onFiltersChanged: OnFiltersChanged;
}

export const TasksFilters: FC<TasksFiltersProps> = withProvider(
	TasksFiltersScopeProvider
)((props) => {
	const { className, onFiltersChanged, } = props;
	const { t, } = useTranslation('tasks');

	const [open, { toggleOn, toggleOff, }] = useToggle();
	const model = useTasksFilters({ onFiltersChanged, });
	const submit = useAction(model.submit);
	const reset = useAction(model.reset);

	const onSubmit = usePreventDefault(() => {
		submit();
		toggleOff();
	});

	const onReset = () => {
		reset();
		toggleOff();
	};

	const submitT = t('actions.tasks_filters.actions.submit');
	const resetT = t('actions.tasks_filters.actions.reset');
	const titleT = t('actions.tasks_filters.title');

	const buttons = (
		<>
			<Button onClick={onReset} type='reset' variant='text' color='primary'>
				{resetT}
			</Button>
			<Button
				onClick={onSubmit}
				type='submit'
				variant='contained'
				color='primary'>
				{submitT}
			</Button>
		</>
	);

	return (
		<FiltersPopover
			title={titleT}
			open={open}
			onClose={toggleOff}
			onOpen={toggleOn}
			icon={<TuneIcon />}
			slots={{ actions: buttons, }}>
			{({ isPopup, }) => (
				<form
					className={cn(styles.wrapper, className)}
					onSubmit={onSubmit}
					aria-label={titleT}>
					<Tags />
					<Authors />
					<After />
					<Before />
					<Show show={!isPopup}>{buttons}</Show>
				</form>
			)}
		</FiltersPopover>
	);
});

const Tags: FC = () => {
	const { t, } = useTranslation('tasks');

	const { tagsAtom, pendingAtom, } = useTags();
	const [tags] = useAtom(tagsAtom);
	const [loading] = useAtom(pendingAtom);

	const model = useTasksFilters();
	const field = model.tagIds;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const onChange = useAction(field.change);
	const onFocus = useAction(field.focus.in);
	const onBlur = useAction(field.focus.out);

	const labelT = t('actions.tasks_filters.fields.tags');

	return (
		<TagPicker
			tags={tags}
			loading={loading}
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			label={labelT}
			isError={!!error}
			helperText={error}
			name='tagIds'
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const Authors: FC = () => {
	const { t, } = useTranslation('tasks');

	const { membersAtom, pendingAtom, } = useMembers();
	const [members] = useAtom(membersAtom);
	const [loading] = useAtom(pendingAtom);

	const model = useTasksFilters();
	const field = model.authorIds;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const onChange = useAction(field.change);
	const onFocus = useAction(field.focus.in);
	const onBlur = useAction(field.focus.out);

	const labelT = t('actions.tasks_filters.fields.authors');

	return (
		<UsersPicker
			users={members}
			loading={loading}
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			label={labelT}
			isError={!!error}
			helperText={error}
			name='authorIds'
			size='medium'
			limitTags={1}
			multiple
		/>
	);
};

const After: FC = () => {
	const { t, } = useTranslation('common');

	const model = useTasksFilters();
	const field = model.after;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const onChange = useAction(field.change);
	const onFocus = useAction(field.focus.in);
	const onBlur = useAction(field.focus.out);

	const labelT = t('fields.create_after');

	return (
		<DatePicker
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			label={labelT}
			isError={!!error}
			helperText={error}
			name='after'
		/>
	);
};

const Before: FC = () => {
	const { t, } = useTranslation('common');

	const model = useTasksFilters();
	const field = model.before;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const onChange = useAction(field.change);
	const onFocus = useAction(field.focus.in);
	const onBlur = useAction(field.focus.out);

	const labelT = t('fields.create_before');

	return (
		<DatePicker
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			label={labelT}
			isError={!!error}
			helperText={error}
			name='before'
		/>
	);
};
