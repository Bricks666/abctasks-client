import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, remove } from './model';

export interface ConfirmRemoveTagProps extends CommonProps, BasePopupProps {}

export const ConfirmRemoveTag: React.FC<ConfirmRemoveTagProps> = (props) => {
	const { isOpen, className, } = props;

	const { t, } = useTranslation('room-tags');
	const onClose = useUnit(popupControls.close);
	const removeTag = useUnit(remove);

	const title = t('actions.remove_tag.title');
	const text = t('actions.remove_tag.text');
	const agree = t('actions.remove_tag.actions.agree');
	const disagree = t('actions.remove_tag.actions.disagree');

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={onClose}
			title={title}
			content={text}
			agreeText={agree}
			onAgree={removeTag}
			disagreeText={disagree}
			onDisagree={onClose}
		/>
	);
};
