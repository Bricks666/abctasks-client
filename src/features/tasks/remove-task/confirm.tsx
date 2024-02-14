import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { BasePopupProps, CommonProps } from '@/shared/types';
import { Confirm } from '@/shared/ui';

import { popupControls, remove } from './model';

export interface ConfirmRemoveTaskProps extends CommonProps, BasePopupProps {}

export const ConfirmRemoveTask: React.FC<ConfirmRemoveTaskProps> = (props) => {
	const { isOpen, className, } = props;

	const { t, } = useTranslation('tasks');
	const close = useUnit(popupControls.close);
	const removeTask = useUnit(remove);

	const title = t('actions.remove_task.title');
	const content = t('actions.remove_task.content');
	const actions = t('actions.remove_task.actions', {
		returnObjects: true,
	}) as Record<string, string>;

	return (
		<Confirm
			className={className}
			isOpen={isOpen}
			onClose={close}
			title={title}
			content={content}
			agreeText={actions.agree}
			onAgree={removeTask}
			disagreeText={actions.disagree}
			onDisagree={close}
		/>
	);
};
