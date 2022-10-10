import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGoBack } from '@/hooks';
import { BasePopup, CommonProps } from '@/interfaces/common';
import { MainPopup } from '@/ui/MainPopup';
import { CreateTaskForm } from '../CreateTaskForm';

import TaskPopupStyle from './CreateTaskPopup.module.css';

export interface CreateTaskPopupProps extends CommonProps, BasePopup {}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');

	return (
		<MainPopup {...props} header={t('add_task.title')} onClose={onClose}>
			<CreateTaskForm className={TaskPopupStyle.form} />
		</MainPopup>
	);
};
