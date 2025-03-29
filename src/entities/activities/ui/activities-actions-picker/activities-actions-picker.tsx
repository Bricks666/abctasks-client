import {
	Autocomplete,
	Chip,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@mui/material';
import { reatomComponent } from '@reatom/npm-react';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps, PickerProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { useActivityActions } from '../../lib';
import { ActivityAction } from '../../models';
import { ActivityActionIcon } from '../activity-action-icon';

export type ActivitiesActionsPickerProps = CommonProps &
	PickerProps<ActivityAction> &
	Omit<FieldProps, 'onChange' | 'value' | 'className' | 'multiline'>;

export const ActivitiesActionsPicker: FC<ActivitiesActionsPickerProps> = memo(
	reatomComponent((props) => {
		const { value, onChange, className, multiple, limitTags, ctx, ...rest } =
			props;
		const actions = useActivityActions();
		const { t, } = useTranslation('activities');

		const translate = (name: string) => {
			return t(`type.${name}`);
		};

		return (
			<Autocomplete
				className={className}
				value={value}
				onChange={onChange}
				loading={ctx.spy(actions.pendingAtom)}
				options={ctx.spy(actions.actionsAtom)}
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
	}, 'ActivitiesActionsPicker')
);
