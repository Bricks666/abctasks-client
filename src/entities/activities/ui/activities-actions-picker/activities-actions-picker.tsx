import { Autocomplete } from '@mui/material';
import * as React from 'react';
import { ActivityAction } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { useActivityActions } from '../../lib';
import { ActivityActionPicture } from '../activity-action-picture';

export interface ActivitiesActionsPickerProps extends CommonProps {
	readonly value: number[];
	readonly onChange: (actions: number[]) => void;
	readonly label: string;
	readonly helperText?: string;
	readonly error?: boolean;
	readonly disabled?: boolean;
	readonly fullWidth?: boolean;
}

export const ActivitiesActionsPicker: React.FC<ActivitiesActionsPickerProps> =
	React.memo((props) => {
		const { value, onChange, className, ...rest } = props;
		const actions = useActivityActions();

		const selected = actions.data.filter((actions) =>
			value?.includes(actions.id)
		);

		const changeHandler = (_: unknown, spheres: ActivityAction[]) => {
			onChange(spheres.map((actions) => actions.id));
		};

		return (
			<Autocomplete
				className={className}
				value={selected}
				onChange={changeHandler}
				loading={actions.pending}
				options={actions.data}
				getOptionLabel={(actions) => actions.name}
				renderOption={(props, option) => {
					return <ActivityActionPicture {...option} />;
				}}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				limitTags={2}
				multiple
			/>
		);
	});
