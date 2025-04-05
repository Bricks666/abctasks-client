import {
	Autocomplete,
	Chip,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import type { CommonProps, PickerProps } from '@/shared/types';
import { Field, type FieldProps } from '@/shared/ui';

import type { ActivityActionId, ActivityActions } from '../../models';
import { ActivityActionIcon } from '../activity-action-icon';

export type ActivitiesActionsPickerProps = CommonProps &
	PickerProps<ActivityActionId> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'> & {
		readonly actions: ActivityActions;
		readonly loading?: boolean;
	};

export const ActivitiesActionsPicker: FC<ActivitiesActionsPickerProps> = memo(
	(props) => {
		const {
			value,
			onChange,
			className,
			multiple,
			limitTags,
			actions,
			loading,
			...rest
		} = props;
		const { t, } = useTranslation('activities');

		const handleChange = preparePickerHandler(
			{
				onChange,
				multiple,
			},
			'id'
		);
		const selected = preparePickerSelectedValue(
			{
				value,
				multiple,
			},
			actions,
			'id'
		);

		const translate = (name: string) => {
			return t(`type.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={selected}
				onChange={handleChange}
				loading={loading}
				options={actions}
				getOptionLabel={(actions) => actions.name}
				renderOption={(props, option) => {
					const activity = translate(option.name);

					return (
						<ListItem {...props}>
							<ListItemAvatar>
								<ActivityActionIcon action={option.name} />
							</ListItemAvatar>
							<ListItemText>{activity}</ListItemText>
						</ListItem>
					);
				}}
				renderInput={(params) => {
					return <Field {...params} {...rest} />;
				}}
				renderTags={(value, getTagProps) => {
					return value.map((option, index) => (
						<Chip
							variant='outlined'
							label={translate(option.name)}
							{...getTagProps({ index, })}
						/>
					));
				}}
				limitTags={limitTags}
				multiple={multiple}
			/>
		);
	}
);
