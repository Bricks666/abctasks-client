/* eslint-disable sonarjs/no-duplicate-string */
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import { reatomComponent, useAction } from '@reatom/npm-react';
import cn from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
	ActivitiesActionsPicker,
	ActivitiesSpheresPicker,
	useActivityActions,
	useActivitySpheres
} from '@/entities/activities';
import { UsersPicker, useMembers } from '@/entities/users';

import { usePreventDefault, useToggle, withProvider } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover, Show } from '@/shared/ui';

import { ActivitiesFiltersScopeProvider, useActivityFilters } from '../../lib';
import { OnFiltersChanged } from '../../model';

import styles from './styles.module.css';

export interface ActivitiesFiltersProps extends CommonProps {
	readonly onFiltersChanged: OnFiltersChanged;
}

export const ActivitiesFilters: FC<ActivitiesFiltersProps> = withProvider(
	ActivitiesFiltersScopeProvider
)((props: ActivitiesFiltersProps) => {
	const { className, onFiltersChanged, } = props;
	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities',
	});

	const model = useActivityFilters({
		onFiltersChanged,
	});
	const submit = useAction(model.submit);
	const reset = useAction(model.reset);
	const [open, { toggleOff, toggleOn, }] = useToggle();
	const onSubmit = usePreventDefault(() => {
		submit();
		toggleOff();
	});
	const onReset = usePreventDefault(() => {
		reset();
		toggleOff();
	});

	const titleT = t('title');
	const submitT = t('actions.submit');
	const resetT = t('actions.reset');

	const buttons = (
		<>
			<Button
				className={styles.reset}
				onClick={onReset}
				type='reset'
				variant='text'
				color='primary'>
				{resetT}
			</Button>
			<Button
				className={styles.submit}
				onClick={onSubmit}
				type='submit'
				variant='contained'>
				{submitT}
			</Button>
		</>
	);

	return (
		<FiltersPopover
			open={open}
			onOpen={toggleOn}
			onClose={toggleOff}
			title={titleT}
			icon={<TuneIcon />}
			slots={{ actions: buttons, }}>
			{({ isPopup, }) => (
				<form
					className={cn(styles.form, className)}
					onSubmit={onSubmit}
					onReset={onReset}
					aria-label={titleT}>
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
});

const Action: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useActivityFilters();
	const field = model.actionIds;
	const { pendingAtom, actionsAtom, } = useActivityActions();
	const actions = ctx.spy(actionsAtom);
	const loading = ctx.spy(pendingAtom);
	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});
	const labelT = t('action');

	const isError = !!error;

	return (
		<ActivitiesActionsPicker
			actions={actions}
			loading={loading}
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			name='actionIds'
			label={labelT}
			limitTags={2}
			multiple
			fullWidth
		/>
	);
}, 'Action');

const Spheres: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useActivityFilters();
	const field = model.sphereIds;
	const { pendingAtom, spheresAtom, } = useActivitySpheres();
	const spheres = ctx.spy(spheresAtom);
	const loading = ctx.spy(pendingAtom);
	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});

	const labelT = t('spheres');

	const isError = !!error;

	return (
		<ActivitiesSpheresPicker
			spheres={spheres}
			loading={loading}
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			limitTags={2}
			name='sphereIds'
			label={labelT}
			multiple
			fullWidth
		/>
	);
}, 'Spheres');

const Users: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useActivityFilters();
	const field = model.activistIds;
	const { membersAtom, pendingAtom, } = useMembers();

	const members = ctx.spy(membersAtom);
	const loading = ctx.spy(pendingAtom);
	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});

	const labelT = t('users');

	const isError = !!error;

	return (
		<UsersPicker
			value={value}
			onChange={change}
			users={members}
			loading={loading}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			name='activistIds'
			label={labelT}
			limitTags={1}
			multiple
		/>
	);
}, 'Users');

const After: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useActivityFilters();
	const field = model.after;
	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);

	const { t, } = useTranslation('common');

	const labelT = t('fields.create_after');

	const isError = !!error;

	return (
		<DatePicker
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			label={labelT}
			name='after'
		/>
	);
}, 'After');

const Before: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useActivityFilters();
	const field = model.before;
	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);

	const { t, } = useTranslation('common');

	const labelT = t('fields.create_before');

	const isError = !!error;

	return (
		<DatePicker
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			label={labelT}
			name='before'
		/>
	);
}, 'Before');
