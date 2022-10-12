import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGoBack } from '@/hooks';
import { BasePopup, CommonProps } from '@/types/common';
import { MainPopup } from '@/ui/MainPopup';
import { EditTaskForm } from './UpdateTaskForm';

import styles from './UpdateTaskPopup.module.css';

export interface UpdateTaskPopupProps extends CommonProps, BasePopup {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');

	return (
		<MainPopup {...props} onClose={onClose} header={t('edit_task.title')}>
			<EditTaskForm className={styles.form} />
		</MainPopup>
	);
};
