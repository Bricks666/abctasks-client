import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';

import {
	ActivitiesActionsPicker,
	ActivitiesSpheresPicker
} from '@/entities/activities';
import { UsersInRoomPicker } from '@/entities/users';

import { useSubmit, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { DatePicker, FiltersPopover } from '@/shared/ui';

import { activitiesFiltersModel } from '../../model';

import styles from './activities-filters.module.css';

export interface ActivitiesFiltersProps extends CommonProps {}

export const ActivitiesFilters: React.FC<ActivitiesFiltersProps> = (props) => {
	const { className, } = props;

	const [open, { toggleOff, toggleOn, }] = useToggle();
	const { fields, reset, submit, } = useForm(activitiesFiltersModel.form);
	const { actionIds, activistIds, after, before, sphereIds, } = fields;

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
			open={open}
			onOpen={toggleOn}
			onClose={toggleOff}
			title='Фильтры активностей'
			filters={
				<form className={cn(styles.form, className)} onSubmit={onSubmit}>
					<ActivitiesActionsPicker
						label='Action type'
						value={actionIds.value}
						onChange={actionIds.onChange}
						helperText={actionIds.errorText()}
						isValid={actionIds.isValid}
						limitTags={2}
						multiple
						fullWidth
					/>
					<ActivitiesSpheresPicker
						label='Activities spheres'
						value={sphereIds.value}
						onChange={sphereIds.onChange}
						helperText={sphereIds.errorText()}
						isValid={sphereIds.isValid}
						limitTags={2}
						multiple
						fullWidth
					/>
					<UsersInRoomPicker
						value={activistIds.value}
						onChange={activistIds.onChange}
						onBlur={activistIds.onBlur}
						helperText={activistIds.errorText()}
						isValid={activistIds.isValid}
						name={activistIds.name}
						label='User'
						limitTags={1}
						multiple
					/>
					<DatePicker
						label='Happened after date'
						value={after.value}
						onChange={after.onChange}
					/>
					<DatePicker
						label='Happened before date'
						value={before.value}
						onChange={before.onChange}
					/>
					<Button
						className={styles.reset}
						onClick={onReset}
						type='reset'
						variant='outlined'
						color='primary'>
						Reset
					</Button>

					<Button
						className={styles.submit}
						type='submit'
						variant='contained'
						color='primary'>
						Apply
					</Button>
				</form>
			}
		/>
	);
};
