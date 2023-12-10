import {
	Autocomplete,
	Chip,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityAction } from '@/shared/api';
import { preparePickerHandler, preparePickerSelectedValue } from '@/shared/lib';
import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useActivityActions } from '../../lib';
import { ActivityActionPicture } from '../activity-action-picture';

export type ActivitiesActionsPickerProps = CommonProps &
	PickerProps<number> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const ActivitiesActionsPicker: React.FC<ActivitiesActionsPickerProps> =
	React.memo((props) => {
		const { value, onChange, className, multiple, limitTags, ...rest } = props;
		const actions = useActivityActions();
		const { t, } = useTranslation('activities');

		const changeHandler = preparePickerHandler<ActivityAction, 'id', number>(
			{ multiple, onChange, },
			'id'
		);

		const selected = preparePickerSelectedValue(
			{ value, multiple, },
			actions.data,
			'id'
		);

		const translate = (name: string) => {
			return t(`type.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={selected as any}
				onChange={changeHandler as any}
				loading={actions.pending}
				options={actions.data}
				getOptionLabel={(actions) => actions.name}
				renderOption={(props, option) => {
					const activity = translate(option.name);

					return (
						<ListItem {...props}>
							<ListItemAvatar>
								<ActivityActionPicture {...option} />
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
	});
