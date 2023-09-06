import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import { createTaskModel } from '../../model';
import { TaskForm } from '../task-form';

import styles from './create-task.module.css';

export interface CreateTaskProps extends CommonProps, BasePopupProps {}

export const CreateTask: React.FC<CreateTaskProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createTaskModel.close);

	return (
		<MainPopup {...props} title={t('task.createTitle')} onClose={onClose}>
			<TaskForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
