import TuneIcon from '@mui/icons-material/Tune';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

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

	const buttons = (
		<>
			<Button
				className={styles.reset}
				onClick={onReset}
				type='reset'
				variant='text'
				color='primary'>
				Сбросить
			</Button>
			<Button
				className={styles.submit}
				onClick={onSubmit}
				type='submit'
				variant='contained'>
				Применить
			</Button>
		</>
	);

	return (
		<FiltersPopover
			open={open}
			onOpen={toggleOn}
			onClose={toggleOff}
			title='Фильтры активностей'
			icon={<TuneIcon />}
			slots={{ actions: buttons, }}>
			{({ isPopup, }) => (
				<form className={cn(styles.form, className)} onSubmit={onSubmit}>
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
	const actionIds = useUnit(form.fields.actionIds);

	return (
		<ActivitiesActionsPicker
			value={actionIds.value}
			onChange={actionIds.onChange}
			helperText={actionIds.errorText}
			isValid={actionIds.isValid}
			name='action'
			label='Тип события'
			limitTags={2}
			multiple
			fullWidth
		/>
	);
};

const Spheres: React.FC = () => {
	const sphereIds = useUnit(form.fields.sphereIds);

	return (
		<ActivitiesSpheresPicker
			value={sphereIds.value}
			onChange={sphereIds.onChange}
			helperText={sphereIds.errorText}
			isValid={sphereIds.isValid}
			limitTags={2}
			name='spheres'
			label='Сферы'
			multiple
			fullWidth
		/>
	);
};

const Users: React.FC = () => {
	const activistIds = useUnit(form.fields.activistIds);

	return (
		<UsersInRoomPicker
			value={activistIds.value}
			onChange={activistIds.onChange}
			onBlur={activistIds.onBlur}
			helperText={activistIds.errorText}
			isValid={activistIds.isValid}
			name='activists'
			label='Пользователи'
			limitTags={1}
			multiple
		/>
	);
};

const After: React.FC = () => {
	const after = useUnit(form.fields.after);

	return (
		<DatePicker
			label='Произошло после'
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
	const before = useUnit(form.fields.before);

	return (
		<DatePicker
			label='Произошло до'
			value={before.value}
			onChange={before.onChange}
			onBlur={before.onBlur}
			helperText={before.errorText}
			isValid={before.isValid}
			name='before'
		/>
	);
};
