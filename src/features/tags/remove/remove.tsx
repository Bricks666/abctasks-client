import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { useParam, useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { mutation } from './model';

export interface RemoveTagProps extends CommonProps {
	readonly tagId: number;
}

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
	const { tagId, className, } = props;
	const { t, } = useTranslation('room-tags');
	const roomId = useParam(routes.room.tags, 'id');
	const removeTag = useUnit(mutation);
	const [toggled, { toggleOff, toggleOn, }] = useToggle(false);

	const onAgree = React.useCallback(() => {
		removeTag.start({ id: tagId, roomId, });
		toggleOff();
	}, [toggleOff, tagId, roomId]);

	const title = t('actions.remove_tag.title');
	const text = t('actions.remove_tag.text');
	const agree = t('actions.remove_tag.actions.agree');
	const disagree = t('actions.remove_tag.actions.disagree');
	const open = t('actions.remove_tag.actions.open');

	return (
		<>
			<Tooltip title={open}>
				<IconButton className={className} onClick={toggleOn}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
			<Confirm
				isOpen={toggled}
				onClose={toggleOff}
				title={title}
				content={text}
				agreeText={agree}
				onAgree={onAgree}
				disagreeText={disagree}
				onDisagree={toggleOff}
			/>
		</>
	);
};
