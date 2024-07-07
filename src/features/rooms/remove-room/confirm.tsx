import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, remove } from './model';

export interface ConfirmRemoveRoomProps extends CommonProps, BasePopupProps {}

export const ConfirmRemoveRoom: React.FC<ConfirmRemoveRoomProps> = (props) => {
	const { isOpen, className, } = props;

	const close = useUnit(popupControls.close);
	const { t, } = useTranslation('rooms');
	const removeRoom = useUnit(remove);

	const titleText = t('actions.remove_room.title');
	const contentText = t('actions.remove_room.content');
	const agreeText = t('actions.remove_room.actions.agree');
	const disagreeText = t('actions.remove_room.actions.disagree');

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={titleText}
			content={contentText}
			agreeText={agreeText}
			onAgree={removeRoom}
			disagreeText={disagreeText}
			onDisagree={close}
		/>
	);
};
