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
	const actions = t('actions.remove_room.actions', {
		returnObjects: true,
	}) as Record<string, string>;

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={titleText}
			content={contentText}
			agreeText={actions.agree}
			onAgree={removeRoom}
			disagreeText={actions.disagree}
			onDisagree={close}
		/>
	);
};
