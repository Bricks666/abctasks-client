/* eslint-disable sonarjs/no-duplicate-string */
import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FieldAtom } from '@reatom/form';

import {
	ActivitiesActionsPicker,
	ActivitiesSpheresPicker
} from '@/entities/activities';
import { MembersPicker } from '@/entities/users';

import { usePreventDefault, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover, Show } from '@/shared/ui';

import { useActivityFilters } from '../lib';
import { OnFiltersChanged } from '../model';

import styles from './filters.module.css';

export interface ActivitiesFiltersProps extends CommonProps {
	readonly roomId: number;
	readonly onFiltersChanged: OnFiltersChanged;
}

export const ActivitiesFilters: FC<ActivitiesFiltersProps> = (props) => {
	const { className, onFiltersChanged, roomId, } = props;
	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities',
	});

	const model = useActivityFilters({
		onFiltersChanged,
		name: 'activities-filters',
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
					aria-label={titleT}>
					<Action field={model.actionIds} />
					<Spheres field={model.sphereIds} />
					<Users field={model.activistIds} roomId={roomId} />
					<After field={model.after} />
					<Before field={model.before} />
					<Show show={!isPopup}> {buttons}</Show>
				</form>
			)}
		</FiltersPopover>
	);
};

interface FieldProps {
	readonly field: FieldAtom;
}

const Action: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});
	const labelT = t('action');

	const isError = !!error;

	return (
		<ActivitiesActionsPicker
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			name='action'
			label={labelT}
			limitTags={2}
			multiple
			fullWidth
		/>
	);
});

const Spheres: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});

	const labelT = t('spheres');

	const isError = !!error;

	return (
		<ActivitiesSpheresPicker
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			limitTags={2}
			name='spheres'
			label={labelT}
			multiple
			fullWidth
		/>
	);
});

const Users: FC<FieldProps & { readonly roomId: number }> = memo((props) => {
	const { field, roomId, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);

	const { t, } = useTranslation('room-activities', {
		keyPrefix: 'actions.filter_activities.fields',
	});

	const labelT = t('users');

	const isError = !!error;

	return (
		<MembersPicker
			roomId={roomId}
			value={value}
			onChange={change}
			onBlur={blur}
			onFocus={focus}
			helperText={error}
			isError={isError}
			name='activists'
			label={labelT}
			limitTags={1}
			multiple
		/>
	);
});

const After: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);

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
});

const Before: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error, [field]);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);

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
});
