import * as React from 'react';
import { getGroupsQuery } from '@/models/groups';
import { useImminentlyQuery } from '@/hooks';
import { CommonProps } from '@/types/common';
import { Select, SelectProps } from '@/ui/Select';
import { LoadingIndicator } from '@/ui/LoadingIndicator';

export interface GroupSelectProps extends CommonProps, SelectProps {
	readonly roomId: number;
}

export const GroupSelect = React.memo(
	React.forwardRef<HTMLSelectElement, GroupSelectProps>(function GroupSelect(
		props,
		ref
	) {
		const { className, roomId, ...rest } = props;
		const { data: groups, loading } = useImminentlyQuery(
			getGroupsQuery,
			Number(roomId),
			roomId
		);

		return (
			<div>
				{loading ? (
					<LoadingIndicator size='small' />
				) : (
					<Select className={className} {...rest} ref={ref}>
						{/* TODO: Добавить загрузку */}
						<option value={-1}>None</option>
						{groups?.map(({ id, name }) => (
							<option value={id} key={id}>
								{name}
							</option>
						))}
					</Select>
				)}
			</div>
		);
	})
);
