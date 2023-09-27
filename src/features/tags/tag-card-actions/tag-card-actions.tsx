import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { t } from 'i18next';
import * as React from 'react';

import { routes, getParams, popupsMap } from '@/shared/configs';
import { useParam, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface TagCardActionsProps extends CommonProps {
	readonly tagId: number;
}

export const TagCardActions: React.FC<TagCardActionsProps> = (props) => {
	const { tagId, className, } = props;
	const roomId = useParam(routes.room.tags, 'id');
	const removeTag = useUnit(mutation);
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeTag.start({ id: tagId, roomId, });
		toggleOff();
	}, [toggleOff, tagId, roomId]);

	return (
		<div className={className}>
			<IconButton
				title={t('actions.update', { ns: 'common', })!}
				to={routes.room.tags as any}
				params={{ id: roomId, }}
				query={{
					[getParams.popup]: popupsMap.updateTag,
					[getParams.tagId]: tagId,
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
				content='Don you want to delete this group? All tasks with this tags will be deleted'
				agreeText='Delete'
				onAgree={onAgree}
				disagreeText='Cancel'
				onDisagree={toggleOff}
			/>
		</div>
	);
};
