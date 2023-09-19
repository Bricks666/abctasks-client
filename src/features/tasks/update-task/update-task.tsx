import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from '@/entities/tasks';

import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonTaskForm, TaskForm } from '../ui';

import { close, form, mutation } from './model';
import styles from './update-task.module.css';

export interface UpdateTaskProps extends CommonProps, BasePopupProps {}

export const UpdateTask: React.FC<UpdateTaskProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(close);
	const { data: task, } = useUnit(taskModel.query);

	const [isMobile, isVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const onClick = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);

	const isFullscreen = isMobile || isVertical;

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const loading = !task;

	const buttonText = t('actions.save', { ns: 'common', });

	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup
			{...props}
			onClose={onClose}
			title={t('task.updateTitle')}
			slots={{ actions, }}>
			{loading ? (
				<SkeletonTaskForm className={styles.taskForm} />
			) : (
				<TaskForm
					className={styles.taskForm}
					buttonText={buttonText}
					$form={form}
					buttonDisabled={pending}
					hideButton={isFullscreen}
				/>
			)}
		</Popup>
	);
};
