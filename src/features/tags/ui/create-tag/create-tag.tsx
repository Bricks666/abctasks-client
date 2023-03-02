import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createTagModel } from '../../model';
import { TagForm } from '../tag-form';

import styles from './create-tag.module.css';

export interface CreateTagProps extends CommonProps, BasePopupProps {}

export const CreateTag: React.FC<CreateTagProps> = (props) => {
	const { t, } = useTranslation('popups');
	const onClose = useUnit(createTagModel.close);

	return (
		<MainPopup {...props} onClose={onClose} title={t('group.createTitle')}>
			<TagForm
				className={styles.form}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
