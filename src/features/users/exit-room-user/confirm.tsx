import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, exit } from './model';

export interface ConfirmUserExitProps extends CommonProps, BasePopupProps {}

export const ConfirmUserExit: React.FC<ConfirmUserExitProps> = (props) => {
	const { isOpen, className, } = props;

	const { t, } = useTranslation('rooms');
	const close = useUnit(popupControls.close);
	const exitRoom = useUnit(exit);

	const title = t('actions.exit_room.title');
	const content = t('actions.exit_room.content');
	const actions = t('actions.exit_room.actions', {
		returnObjects: true,
	}) as Record<string, string>;

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={title}
			content={content}
			agreeText={actions.agree}
			onAgree={exitRoom}
			disagreeText={actions.disagree}
			onDisagree={close}
		/>
	);
};
