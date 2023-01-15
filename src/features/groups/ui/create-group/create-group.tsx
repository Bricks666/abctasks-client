import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createGroupModel } from '../../model';
import { GroupForm } from '../group-form';

import styles from './create-group.module.css';

export interface CreateGroupProps extends CommonProps, BasePopupProps {}

export const CreateGroup: React.FC<CreateGroupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createGroupModel.close);

	return (
		<MainPopup {...props} onClose={onClose} title={t('group.createTitle')}>
			<GroupForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
