import { Button, TextField } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { ActivitiesActions, ActivitiesSpheres } from '@/entities/activities';
import { UsersInRoomPicker } from '@/entities/rooms';
import { CommonProps } from '@/shared/types';
import { DatePicker } from '@/shared/ui';
import { activitiesFiltersModel } from '../../model';

import styles from './activities-filters.module.css';

export const ActivitiesFilters: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	const { fields, reset, } = useForm(activitiesFiltersModel.form);
	const { action, activist, after, before, sphereName, } = fields;

	return (
		<form className={cn(styles.form, className)}>
			<ActivitiesActions
				label='Action type'
				{...action}
				error={action.hasError()}
				fullWidth
			/>
			<ActivitiesSpheres fullWidth label='Activities spheres' {...sphereName} />
			<UsersInRoomPicker label='User' {...activist} />
			<DatePicker
				{...after}
				label='Happened after date'
				renderInput={(params) => <TextField {...params} />}
			/>
			<DatePicker
				{...before}
				label='Happened before date'
				renderInput={(params) => <TextField {...params} />}
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
