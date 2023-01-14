import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { ActivitiesActions, ActivitiesSpheres } from '@/entities/activities';
import { UsersInRoomPicker } from '@/entities/rooms';
import { CommonProps } from '@/shared/types';
import { DatePicker } from '@/shared/ui';
import { activitiesFiltersModel } from '../../model';

import styles from './activities-filters.module.css';

export interface ActivitiesFiltersProps extends CommonProps {}

export const ActivitiesFilters: React.FC<ActivitiesFiltersProps> = (props) => {
	const { className, } = props;

	const { fields, reset, } = useForm(activitiesFiltersModel.form);
	const { action, activistId, after, before, sphereName, } = fields;

	return (
		<form className={cn(styles.form, className)}>
			<ActivitiesActions
				label='Action type'
				value={action.value}
				onChange={action.onChange}
				error={action.hasError()}
				fullWidth
			/>
			<ActivitiesSpheres
				label='Activities spheres'
				value={sphereName.value}
				onChange={sphereName.onChange}
				error={sphereName.hasError()}
				fullWidth
			/>
			<UsersInRoomPicker
				label='User'
				value={activistId.value}
				onChange={activistId.onChange}
				onBlur={activistId.onBlur}
				errorText={activistId.errorText()}
				isValid={activistId.isValid}
				name={activistId.name}
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
				onClick={reset as any}
				type='reset'
				variant='outlined'
				color='primary'>
				Reset
			</Button>
		</form>
	);
};
