import { useMutation } from '@farfetched/react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import { t } from 'i18next';
import * as React from 'react';
import { routes, getParams, popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { removeGroupModel } from '../../model';

export interface GroupCardActionsProps extends CommonProps {
	readonly roomId: number;
	readonly groupId: number;
}

export const GroupCardActions: React.FC<GroupCardActionsProps> = (props) => {
	const { groupId, roomId, className, } = props;
	const removeGroup = useMutation(removeGroupModel.mutation);

	return (
		<div className={className}>
			<IconButton
				title={t('actions.update', { ns: 'common', })!}
				to={routes.room as any}
				params={{ id: roomId, }}
				query={{
					[getParams.popup]: popups.updateGroup,
					[getParams.groupId]: groupId,
				}}
				component={Link}>
				<EditIcon />
			</IconButton>
			<IconButton
				onClick={() => removeGroup.start({ id: groupId, roomId, })}
				title={t('actions.remove', { ns: 'common', })!}>
				<DeleteIcon />
			</IconButton>
		</div>
	);
};
