import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, remove } from './model';

export interface ConfirmRemoveUserProps extends CommonProps, BasePopupProps {}

export const ConfirmRemoveUser: React.FC<ConfirmRemoveUserProps> = (props) => {
	const { isOpen, className, } = props;

	const { t, } = useTranslation('room-users');
	const close = useUnit(popupControls.close);
	const removeUser = useUnit(remove);

	const title = t('actions.remove_user.title');
	const content = t('actions.remove_user.content');
	const agree = t('actions.remove_user.actions.agree');
	const disagree = t('actions.remove_user.actions.disagree');

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={title}
			content={content}
			agreeText={agree}
			onAgree={removeUser}
			disagreeText={disagree}
			onDisagree={close}
		/>
	);
};
