import { MenuItem } from '@mui/material';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';

import { TASK_STATUSES } from '../../models';

export interface TaskStatusSelectProps
	extends CommonProps,
		Omit<FieldProps, 'select'> {
	readonly hasEmptyOption?: boolean;
	readonly emptyOptionText?: string;
}

export const TaskStatusSelect: FC<TaskStatusSelectProps> = memo((props) => {
	const { t, } = useTranslation('tasks');
	const { hasEmptyOption, emptyOptionText, ...rest } = props;

	return (
		<Field {...rest} select>
			{hasEmptyOption ? (
				<MenuItem value={null as any} key='empty'>
					{emptyOptionText}
				</MenuItem>
			) : null}
			{Object.values(TASK_STATUSES).map((name) => (
				<MenuItem value={name} key={name}>
					{t(`statuses.${name}`)}
				</MenuItem>
			))}
		</Field>
	);
});
