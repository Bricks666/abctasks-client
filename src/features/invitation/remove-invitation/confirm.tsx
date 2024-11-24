import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, remove } from './model';

export interface ConfirmRemoveInvitationProps extends BasePopupProps {}

export const ConfirmRemoveInvitation: React.FC<ConfirmRemoveInvitationProps> = (
	props
) => {
	const { isOpen, className, } = props;

	const close = useUnit(popupControls.close);
	const removeInvitation = useUnit(remove);
	const { t, } = useTranslation('room-invitations');

	const titleText = t('actions.remove_invitation.title');
	const contentText = t('actions.remove_invitation.content');
	const agreeText = t('actions.remove_invitation.actions.agree');
	const disagreeText = t('actions.remove_invitation.actions.disagree');

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={titleText}
			content={contentText}
			agreeText={agreeText}
			onAgree={removeInvitation}
			disagreeText={disagreeText}
			onDisagree={close}
		/>
	);
};
