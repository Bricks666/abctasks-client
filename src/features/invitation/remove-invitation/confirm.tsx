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

	const title = t('actions.remove_invitation.title');
	const content = t('actions.remove_invitation.content');
	const agree = t('actions.remove_invitation.actions.agree');
	const disagree = t('actions.remove_invitation.actions.disagree');

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={title}
			content={content}
			agreeText={agree}
			onAgree={removeInvitation}
			disagreeText={disagree}
			onDisagree={close}
		/>
	);
};
