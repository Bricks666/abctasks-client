import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GroupForm } from '@/features/groups';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createGroupPopupModel } from '../../model';

import styles from './create-group-popup.module.css';

export interface CreateGroupPopupProps extends CommonProps, BasePopupProps {}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createGroupPopupModel.close);

	return (
		<MainPopup {...props} onClose={onClose} title={t('group.createTitle')}>
			<GroupForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
