import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BasePopup, CommonProps } from '@/interfaces/common';
import { MainPopup } from '@/ui/MainPopup';
import { useGoBack } from '@/hooks';
import { GroupForm } from '../GroupForm';
import { createGroup } from '@/models/Groups';

import styles from './CreateGroupPopup.module.css';

export interface CreateGroupPopupProps extends CommonProps, BasePopup {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');
	return (
		<MainPopup
			{...props}
			onClose={onClose}
			header={t('add_group.title')}
			alt={t('add_group.title')}>
			<GroupForm
				className={styles.form}
				afterSubmit={onClose}
				submitHandler={createGroup}
				buttonText={t('add_group.button')}
			/>
		</MainPopup>
	);
};
