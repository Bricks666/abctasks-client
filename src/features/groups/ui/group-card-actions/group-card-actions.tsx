import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { t } from 'i18next';
import * as React from 'react';
import { routes, getParams, popups } from '@/shared/configs';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';
import { removeGroupModel } from '../../model';

export interface GroupCardActionsProps extends CommonProps {
	readonly groupId: number;
}

export const GroupCardActions: React.FC<GroupCardActionsProps> = (props) => {
	const { groupId, className, } = props;
	const params = useUnit(routes.room.$params);
	const removeGroup = useUnit(removeGroupModel.mutation);
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeGroup.start({ id: groupId, roomId: params.id, });
		toggleOff();
	}, [toggleOff, groupId, params.id]);

	return (
		<div className={className}>
			<IconButton
				title={t('actions.update', { ns: 'common', })!}
				to={routes.room as any}
				params={params}
				query={{
					[getParams.popup]: popups.updateGroup,
					[getParams.groupId]: groupId,
				}}
				component={Link}>
				<EditIcon />
			</IconButton>
			<IconButton
				onClick={toggleOn}
				title={t('actions.remove', { ns: 'common', })!}>
				<DeleteIcon />
			</IconButton>
			<Confirm
				isOpen={toggled}
				onClose={toggleOff}
				title='Are you sure?'
				content='Don you want to delete this group? All tasks with this groups will be deleted'
				agreeText='Delete'
				onAgree={onAgree}
				disagreeText='Cancel'
				onDisagree={toggleOff}
			/>
		</div>
	);
};
