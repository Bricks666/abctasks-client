import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskForm } from '@/features/tasks';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createTaskPopupModel } from '../../model';

import styles from './create-task-popup.module.css';

export interface CreateTaskPopupProps extends CommonProps, BasePopupProps {}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createTaskPopupModel.close);

	return (
		<MainPopup {...props} title={t('task.createTitle')} onClose={onClose}>
			<TaskForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
