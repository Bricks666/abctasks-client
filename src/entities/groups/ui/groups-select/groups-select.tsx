import { MenuItem, Skeleton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field, FieldProps } from '@/shared/ui';
import { useGroups } from '../../lib';
import { GroupLabel } from '../group-label';

export interface GroupsSelectProps
	extends CommonProps,
		Omit<FieldProps, 'select'> {}

export const GroupsSelect: React.FC<GroupsSelectProps> = React.memo((props) => {
	const { className, ...rest } = props;
	const groups = useGroups();

	return groups.pending ? (
		<Skeleton className={className} height='3em' />
	) : (
		<Field className={className} {...rest} select>
			{groups.data.map((group) => (
				<MenuItem value={group.id} key={group.id}>
					<GroupLabel {...group} />
				</MenuItem>
			))}
		</Field>
	);
});
