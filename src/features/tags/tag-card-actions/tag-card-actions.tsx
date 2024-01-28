import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { useParam, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation, openPopup } from './model';

export interface TagCardActionsProps extends CommonProps {
	readonly tagId: number;
}

/**
 * @todo
 * Split on components
 */
export const TagCardActions: React.FC<TagCardActionsProps> = (props) => {
	const { tagId, className, } = props;
	const { t, } = useTranslation('room-tags');
	const roomId = useParam(routes.room.tags, 'id');
	const removeTag = useUnit(mutation);
	const open = useUnit(openPopup);
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onClick = () => {
		open(tagId);
	};

	const onAgree = React.useCallback(() => {
		removeTag.start({ id: tagId, roomId, });
		toggleOff();
	}, [toggleOff, tagId, roomId]);

	const updateTitle = t('actions.update_tag.actions.open');

	const removeTitle = t('actions.remove_tag.title');
	const removeText = t('actions.remove_tag.text');
	const removeAgree = t('actions.remove_tag.actions.agree');
	const removeDisagree = t('actions.remove_tag.actions.disagree');
	const openRemove = t('actions.remove_tag.actions.open');

	return (
		<div className={className}>
			<Tooltip title={updateTitle}>
				<IconButton onClick={onClick}>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title={openRemove}>
				<IconButton onClick={toggleOn}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
			<Confirm
				isOpen={toggled}
				onClose={toggleOff}
				title={removeTitle}
				content={removeText}
				agreeText={removeAgree}
				onAgree={onAgree}
				disagreeText={removeDisagree}
				onDisagree={toggleOff}
			/>
		</div>
	);
};
