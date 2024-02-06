/* eslint-disable sonarjs/no-duplicate-string */
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	ActivitiesActionsPicker,
	ActivitiesSpheresPicker
} from '@/entities/activities';
import { UsersInRoomPicker } from '@/entities/users';

import { usePreventDefault, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover, Show } from '@/shared/ui';

import styles from './filters.module.css';
import { form } from './model';

export interface ActivitiesFiltersProps extends CommonProps {}

export const ActivitiesFilters: React.FC<ActivitiesFiltersProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-activities');

	const [open, { toggleOff, toggleOn, }] = useToggle();
	const [reset, submit] = useUnit([form.reset, form.submit]);

	const onSubmit = usePreventDefault(() => {
		submit();
		toggleOff();
	});

	const onReset = () => {
		reset();
		toggleOff();
	};

	const title = t('actions.filter_activities.title');
	const actions = t('actions.filter_activities.actions', {
		returnObjects: true,
	}) as Record<string, string>;

	const buttons = (
		<>
			<Button
				className={styles.reset}
				onClick={onReset}
				type='reset'
				variant='text'
				color='primary'>
				{actions.reset}
			</Button>
			<Button
				className={styles.submit}
				onClick={onSubmit}
				type='submit'
				variant='contained'>
				{actions.submit}
			</Button>
		</>
	);

	return (
		<FiltersPopover
			open={open}
			onOpen={toggleOn}
			onClose={toggleOff}
			title={title}
			icon={<TuneIcon />}
			slots={{ actions: buttons, }}>
			{({ isPopup, titleId, }) => (
				<form
					className={cn(styles.form, className)}
					onSubmit={onSubmit}
					aria-labelledby={titleId}>
					<Action />
					<Spheres />
					<Users />
					<After />
					<Before />
					<Show show={!isPopup}> {buttons}</Show>
				</form>
			)}
		</FiltersPopover>
	);
};

const Action: React.FC = () => {
	const { t, } = useTranslation('room-activities');

	const label = t('actions.filter_activities.fields.action');

	const actionIds = useUnit(form.fields.actionIds);

	return (
		<ActivitiesActionsPicker
			value={actionIds.value}
			onChange={actionIds.onChange}
			helperText={actionIds.errorText}
			isValid={actionIds.isValid}
			name='action'
			label={label}
			limitTags={2}
			multiple
			fullWidth
		/>
	);
};

const Spheres: React.FC = () => {
	const { t, } = useTranslation('room-activities');

	const label = t('actions.filter_activities.fields.spheres');
	const sphereIds = useUnit(form.fields.sphereIds);

	return (
		<ActivitiesSpheresPicker
			value={sphereIds.value}
			onChange={sphereIds.onChange}
			helperText={sphereIds.errorText}
			isValid={sphereIds.isValid}
			limitTags={2}
			name='spheres'
			label={label}
			multiple
			fullWidth
		/>
	);
};

const Users: React.FC = () => {
	const { t, } = useTranslation('room-activities');

	const label = t('actions.filter_activities.fields.users');
	const activistIds = useUnit(form.fields.activistIds);

	return (
		<UsersInRoomPicker
			value={activistIds.value}
			onChange={activistIds.onChange}
			onBlur={activistIds.onBlur}
			helperText={activistIds.errorText}
			isValid={activistIds.isValid}
			name='activists'
			label={label}
			limitTags={1}
			multiple
		/>
	);
};

const After: React.FC = () => {
	const { t, } = useTranslation('common');

	const label = t('fields.create_after');
	const after = useUnit(form.fields.after);

	return (
		<DatePicker
			label={label}
			value={after.value}
			onChange={after.onChange}
			onBlur={after.onBlur}
			helperText={after.errorText}
			isValid={after.isValid}
			name='after'
		/>
	);
};

const Before: React.FC = () => {
	const { t, } = useTranslation('common');

	const label = t('fields.create_before');
	const before = useUnit(form.fields.before);

	return (
		<DatePicker
			label={label}
			value={before.value}
			onChange={before.onChange}
			onBlur={before.onBlur}
			helperText={before.errorText}
			isValid={before.isValid}
			name='before'
		/>
	);
};
