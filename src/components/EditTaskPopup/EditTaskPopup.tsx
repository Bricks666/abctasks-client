import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGoBack } from '@/hooks';
import { BasePopup, CommonProps } from '@/interfaces/common';
import { MainPopup } from '@/ui/MainPopup';
import { EditTaskForm } from '../EditTaskForm';

import styles from './EditTaskPopup.module.css';

export interface EditTaskPopupProps extends CommonProps, BasePopup {}

export const EditTaskPopup: React.FC<EditTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');

	return (
		<MainPopup {...props} onClose={onClose} header={t('edit_task.title')}>
			<EditTaskForm className={styles.form} />
		</MainPopup>
	);
};
